import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarCheck,
  ExternalLink,
  HeartHandshake,
  Loader2,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Video,
} from "lucide-react";

type LatLng = {
  lat: number;
  lng: number;
};

type Psychologist = {
  id: string;
  name: string;
  specialty: string;
  distanceKm: number;
  availability: string;
  phone: string;
  rating: number;
  avatar: string;
  location: LatLng;
  address?: string;
};

type GooglePlace = {
  place_id?: string;
  name?: string;
  rating?: number;
  vicinity?: string;
  formatted_phone_number?: string;
  geometry?: {
    location?: {
      lat: () => number;
      lng: () => number;
    };
  };
  photos?: Array<{
    getUrl: (options: { maxWidth: number; maxHeight: number }) => string;
  }>;
};

type GoogleLike = {
  maps: {
    Map: new (
      element: HTMLElement,
      options: Record<string, unknown>
    ) => {
      setCenter: (position: LatLng) => void;
    };
    Marker: new (options: Record<string, unknown>) => unknown;
    Circle: new (options: Record<string, unknown>) => unknown;
    LatLng: new (lat: number, lng: number) => unknown;
    Size: new (width: number, height: number) => unknown;
    Animation: {
      DROP: unknown;
      BOUNCE: unknown;
    };
    SymbolPath: {
      CIRCLE: unknown;
    };
    places: {
      PlacesService: new (map: unknown) => {
        nearbySearch: (
          request: Record<string, unknown>,
          callback: (results: GooglePlace[] | null, status: string) => void
        ) => void;
        getDetails: (
          request: Record<string, unknown>,
          callback: (result: GooglePlace | null) => void
        ) => void;
      };
      PlacesServiceStatus: {
        OK: string;
      };
    };
  };
};

declare global {
  interface Window {
    google?: GoogleLike;
  }
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as
  | string
  | undefined;

const defaultLocation: LatLng = {
  lat: -12.0464,
  lng: -77.0428,
};

const demoPsychologists: Psychologist[] = [
  {
    id: "demo-1",
    name: "Dra. Lucía Herrera",
    specialty: "Ansiedad y bienestar emocional",
    distanceKm: 1.8,
    availability: "Disponible hoy",
    phone: "+51 987 420 118",
    rating: 4.9,
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=240&q=80",
    location: { lat: -12.052, lng: -77.036 },
    address: "Consulta presencial y virtual",
  },
  {
    id: "demo-2",
    name: "Dr. Mateo Salazar",
    specialty: "Estrés, hábitos y burnout",
    distanceKm: 3.2,
    availability: "Cupos esta semana",
    phone: "+51 946 880 301",
    rating: 4.8,
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=240&q=80",
    location: { lat: -12.061, lng: -77.05 },
    address: "Especialista en adultos jóvenes",
  },
  {
    id: "demo-3",
    name: "Psic. Camila Torres",
    specialty: "Depresión y consejería estudiantil",
    distanceKm: 4.6,
    availability: "Atención online",
    phone: "+51 955 214 730",
    rating: 4.7,
    avatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=240&q=80",
    location: { lat: -12.034, lng: -77.03 },
    address: "Primera orientación disponible",
  },
];

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#111827" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#d1d5db" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#020617" }] },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1f2937" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0f172a" }],
  },
];

const loadGoogleMaps = () => {
  if (window.google?.maps) return Promise.resolve(window.google);

  if (!GOOGLE_MAPS_API_KEY) {
    return Promise.reject(new Error("Falta VITE_GOOGLE_MAPS_API_KEY"));
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    'script[data-emoria-google-maps="true"]'
  );

  if (existingScript) {
    return new Promise<GoogleLike>((resolve, reject) => {
      existingScript.addEventListener("load", () => {
        if (window.google) resolve(window.google);
      });
      existingScript.addEventListener("error", () =>
        reject(new Error("No se pudo cargar Google Maps"))
      );
    });
  }

  return new Promise<GoogleLike>((resolve, reject) => {
    const script = document.createElement("script");
    script.dataset.emoriaGoogleMaps = "true";
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.onload = () => {
      if (window.google) resolve(window.google);
    };
    script.onerror = () => reject(new Error("No se pudo cargar Google Maps"));
    document.head.appendChild(script);
  });
};

const getDistanceKm = (from: LatLng, to: LatLng) => {
  const earthRadiusKm = 6371;
  const dLat = ((to.lat - from.lat) * Math.PI) / 180;
  const dLng = ((to.lng - from.lng) * Math.PI) / 180;
  const lat1 = (from.lat * Math.PI) / 180;
  const lat2 = (to.lat * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) *
      Math.sin(dLng / 2) *
      Math.cos(lat1) *
      Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Number((earthRadiusKm * c).toFixed(1));
};

const getUserLocation = () =>
  new Promise<LatLng>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalización no disponible"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      reject,
      {
        enableHighAccuracy: true,
        timeout: 9000,
        maximumAge: 60000,
      }
    );
  });

const getThemeColor = (element: HTMLElement | null, token: string, fallback: string) => {
  const value = getComputedStyle(element ?? document.documentElement)
    .getPropertyValue(token)
    .trim();

  return value || fallback;
};

export default function NearbyPsychologistsPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [location, setLocation] = useState<LatLng>(defaultLocation);
  const [psychologists, setPsychologists] =
    useState<Psychologist[]>(demoPsychologists);
  const [status, setStatus] = useState("Detectando tu ubicación...");
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const sortedPsychologists = useMemo(
    () =>
      [...psychologists].sort(
        (first, second) => first.distanceKm - second.distanceKm
      ),
    [psychologists]
  );

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      let activeLocation = defaultLocation;

      try {
        const currentLocation = await getUserLocation();
        if (!isMounted) return;
        activeLocation = currentLocation;
        setLocation(currentLocation);
        setStatus("Buscando psicólogos cerca de ti...");
      } catch {
        setIsUsingFallback(true);
        setStatus("Usando una ubicación aproximada. Puedes activar permisos para mejores resultados.");
      }

      try {
        const google = await loadGoogleMaps();
        if (!isMounted || !mapRef.current) return;

        const primary = getThemeColor(mapRef.current, "--theme-primary", "#38bdf8");

        const map = new google.maps.Map(mapRef.current, {
          center: activeLocation,
          zoom: 13,
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
          gestureHandling: "greedy",
        });

        mapInstanceRef.current = map;
        map.setCenter(activeLocation);

        new google.maps.Circle({
          map,
          center: activeLocation,
          radius: 1800,
          fillColor: primary,
          fillOpacity: 0.08,
          strokeColor: primary,
          strokeOpacity: 0.28,
          strokeWeight: 1,
        });

        new google.maps.Marker({
          map,
          position: activeLocation,
          animation: google.maps.Animation.DROP,
          title: "Tu ubicación",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: primary,
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });

        const service = new google.maps.places.PlacesService(map);
        const request = {
          location: new google.maps.LatLng(activeLocation.lat, activeLocation.lng),
          radius: 6000,
          keyword: "psicólogo psicoterapia salud mental",
          type: "doctor",
        };

        service.nearbySearch(request, (results, placesStatus) => {
          if (
            placesStatus !== google.maps.places.PlacesServiceStatus.OK ||
            !results?.length
          ) {
            if (!isMounted) return;
            setIsUsingFallback(true);
            setPsychologists(
              demoPsychologists.map((psychologist) => ({
                ...psychologist,
                distanceKm: getDistanceKm(activeLocation, psychologist.location),
              }))
            );
            setStatus("Mostrando recomendaciones demo mientras Google Places no devuelve resultados.");
            setIsLoading(false);
            return;
          }

          const mapped = results.slice(0, 6).map((place, index) => {
            const placeLocation = {
              lat: place.geometry?.location?.lat() ?? activeLocation.lat,
              lng: place.geometry?.location?.lng() ?? activeLocation.lng,
            };

            new google.maps.Marker({
              map,
              position: placeLocation,
              animation: google.maps.Animation.DROP,
              title: place.name,
              icon: {
                url:
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><circle cx="21" cy="21" r="17" fill="${primary}" fill-opacity="0.95"/><circle cx="21" cy="21" r="8" fill="white"/><circle cx="21" cy="21" r="20" fill="none" stroke="white" stroke-opacity="0.5" stroke-width="2"/></svg>`
                  ),
                scaledSize: new google.maps.Size(42, 42),
              },
            });

            const specialistTypes = [
              "Ansiedad y estrés",
              "Bienestar emocional",
              "Depresión y autoestima",
              "Consejería estudiantil",
              "Terapia individual",
              "Regulación emocional",
            ];

            return {
              id: place.place_id ?? `place-${index}`,
              name: place.name ?? "Especialista en salud mental",
              specialty: specialistTypes[index % specialistTypes.length],
              distanceKm: getDistanceKm(activeLocation, placeLocation),
              availability: index % 2 === 0 ? "Disponible hoy" : "Cupos esta semana",
              phone: "Consultar por Maps",
              rating: place.rating ?? 4.7,
              avatar:
                place.photos?.[0]?.getUrl({ maxWidth: 240, maxHeight: 240 }) ??
                demoPsychologists[index % demoPsychologists.length].avatar,
              location: placeLocation,
              address: place.vicinity,
            };
          });

          if (!isMounted) return;
          setPsychologists(mapped);
          setStatus("Resultados actualizados según tu ubicación actual.");
          setIsLoading(false);
        });

      } catch (error) {
        if (!isMounted) return;
        setIsUsingFallback(true);
        setPsychologists(
          demoPsychologists.map((psychologist) => ({
            ...psychologist,
            distanceKm: getDistanceKm(activeLocation, psychologist.location),
          }))
        );
        setStatus(
          error instanceof Error
            ? error.message
            : "No se pudo cargar Google Maps. Mostrando recomendaciones demo."
        );
        setIsLoading(false);
      }
    };

    void initialize();

    return () => {
      isMounted = false;
    };
  }, [location.lat, location.lng]);

  return (
    <section className="w-full min-h-screen text-white pb-8">
      <div className="mb-8 flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <p className="text-[var(--theme-primary)] uppercase tracking-[0.35em] text-sm font-bold mb-3">
            Red profesional
          </p>
          <h1 className="text-3xl sm:text-5xl font-black">
            Psicólogos Cercanos
          </h1>
          <p className="text-white/60 mt-4 max-w-2xl">
            Encuentra apoyo psicológico profesional cerca de ti con ubicación en tiempo real,
            mapa interactivo y recomendaciones impulsadas por EMORIA.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] px-4 py-3 backdrop-blur-2xl shadow-[var(--theme-shadow)]">
          <div className="flex items-center gap-3 text-sm text-white/70">
            {isLoading ? (
              <Loader2 className="text-[var(--theme-primary)] animate-spin" size={18} />
            ) : (
              <Navigation className="text-[var(--theme-primary)]" size={18} />
            )}
            <span>{status}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.65fr] gap-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative min-h-[420px] sm:min-h-[520px] rounded-[34px] border border-[var(--theme-border)] bg-[var(--theme-card)] overflow-hidden shadow-[var(--theme-shadow)] backdrop-blur-2xl"
        >
          <div ref={mapRef} className="absolute inset-0 bg-slate-950/80" />
          {!GOOGLE_MAPS_API_KEY && (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center bg-black/45 backdrop-blur-sm">
              <div className="max-w-md">
                <MapPin className="mx-auto text-[var(--theme-primary)] mb-4" size={42} />
                <h2 className="text-2xl font-black">Google Maps listo para conectar</h2>
                <p className="text-white/60 mt-3 text-sm leading-relaxed">
                  Agrega `VITE_GOOGLE_MAPS_API_KEY` en tu entorno para activar el mapa real,
                  marcadores y Places API. Mientras tanto, EMORIA muestra especialistas demo.
                </p>
              </div>
            </div>
          )}

          <div className="absolute left-4 top-4 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-2xl">
            <p className="text-[10px] uppercase tracking-widest text-white/45 font-bold">
              Ubicación actual
            </p>
            <p className="text-sm font-bold mt-1">
              {location.lat.toFixed(3)}, {location.lng.toFixed(3)}
            </p>
          </div>
        </motion.div>

        <aside className="space-y-5">
          <div className="rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-[var(--theme-primary)]" size={22} />
              <h2 className="font-black text-xl">Coincidencia IA</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Priorizamos especialistas de ansiedad, estrés, depresión, bienestar emocional
              y consejería estudiantil cerca de tu radio actual.
            </p>
            {isUsingFallback && (
              <p className="mt-4 rounded-2xl bg-[var(--theme-hover)] px-4 py-3 text-xs text-white/70">
                Modo demo activo: configura Maps o permite ubicación para resultados reales.
              </p>
            )}
          </div>

          <div className="rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            <h2 className="font-black text-xl mb-4">Filtros emocionales</h2>
            <div className="flex flex-wrap gap-2">
              {["Ansiedad", "Estrés", "Depresión", "Bienestar", "Estudiantes"].map(
                (filter) => (
                  <span
                    key={filter}
                    className="rounded-full border border-[var(--theme-border)] bg-white/5 px-3 py-2 text-xs text-white/70"
                  >
                    {filter}
                  </span>
                )
              )}
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
        {sortedPsychologists.map((psychologist, index) => (
          <motion.article
            key={psychologist.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 shadow-[var(--theme-shadow)] backdrop-blur-2xl hover:bg-[var(--theme-hover)] transition"
          >
            <div className="flex items-start gap-4">
              <img
                src={psychologist.avatar}
                alt={psychologist.name}
                className="w-16 h-16 rounded-2xl object-cover border border-white/10"
              />
              <div className="min-w-0">
                <h2 className="text-lg font-black">{psychologist.name}</h2>
                <p className="text-white/55 text-sm mt-1">{psychologist.specialty}</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-white/40 text-xs">Distancia</p>
                <p className="font-bold flex items-center gap-1 mt-1">
                  <MapPin size={14} />
                  {psychologist.distanceKm} km
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-white/40 text-xs">Rating</p>
                <p className="font-bold flex items-center gap-1 mt-1 text-[var(--theme-accent)]">
                  <Star size={14} fill="currentColor" />
                  {psychologist.rating.toFixed(1)}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-white/65">
              <p className="flex items-center gap-2">
                <CalendarCheck size={16} className="text-[var(--theme-primary)]" />
                {psychologist.availability}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-[var(--theme-primary)]" />
                {psychologist.phone}
              </p>
              {psychologist.address && (
                <p className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[var(--theme-primary)]" />
                  {psychologist.address}
                </p>
              )}
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button className="rounded-2xl bg-[image:var(--theme-button)] py-3 font-bold flex items-center justify-center gap-2">
                <Video size={17} />
                Reservar cita
              </button>
              <button className="rounded-2xl border border-[var(--theme-border)] bg-white/5 py-3 font-bold text-white/80 hover:bg-white/10 transition flex items-center justify-center gap-2">
                <ExternalLink size={17} />
                Ver perfil
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 rounded-[34px] border border-red-400/25 bg-red-950/25 p-5 sm:p-7 shadow-[0_20px_80px_rgba(220,38,38,0.18)] backdrop-blur-2xl"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-3 text-red-200">
              <AlertTriangle size={24} />
              <h2 className="text-2xl font-black">Apoyo inmediato / Crisis emocional</h2>
            </div>
            <p className="text-white/65 mt-3 max-w-2xl">
              Si estás atravesando una crisis o sientes que podrías hacerte daño,
              busca ayuda inmediata con una persona cercana o servicios de emergencia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:min-w-[560px]">
            <button className="rounded-2xl bg-red-500 px-4 py-3 font-bold flex items-center justify-center gap-2">
              <Phone size={17} />
              Llamar línea de ayuda
            </button>
            <button className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3 font-bold flex items-center justify-center gap-2">
              <HeartHandshake size={17} />
              Hablar con consejero
            </button>
            <button className="rounded-2xl bg-white text-red-700 px-4 py-3 font-black flex items-center justify-center gap-2">
              <AlertTriangle size={17} />
              Emergencia emocional
            </button>
          </div>
        </div>
      </motion.section>
    </section>
  );
}
