'use client';

import Cate from '../../public/images/cate.png';
import FilterDropdown from '../components/FilterDropdown';
import { useSpecializationStore } from '@/store/specializationStore';
import { getAllspecialization } from '@/api/Specialization/route';
import { useCallback, useEffect, useState } from 'react';
import {
  ArrowRight,
  CalendarIcon,
  HeartPulse,
  PawPrint,
  Target,
  Users,
} from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { COLORS } from './constants/color';
import StatsCards from '../components/StatsCards';
import CategoryGrid from '../components/CategoryGrid';
import PetCareFeatures from '../components/PetCareFeatures';
import { useDoctorStore } from '@/store/doctorStore';
import { getDoctorData } from '@/api/Doctor/route';
import TestimonialSlider from '../components/TestimonialSlider';
import { Doctor, Specialization } from '@/lib/typings';
import PetCarePlan from '../components/PetCarePlan';
import HeroSection from '../components/navbar/FooterHeroSection';
import ProductShowcase from '../components/ProductShowcase';
import PetCareSection from '../components/navbar/Section';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import TopSpecialistCard from '../components/Doctor/TopSpecialistCard';
// import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Option {
  label: string;
  value: number;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  // const router = useRouter();
  const [nameSpecialization, setSelectedSpecialization] =
    useState<Option | null>(null);

  const specialization = useSpecializationStore(
    (state: { specialization: Specialization[] }) => state.specialization
  );
  const setAllSpecialization = useSpecializationStore(
    (state: { setAllSpecialization: (specs: Specialization[]) => void }) =>
      state.setAllSpecialization
  );

  const doctors = useDoctorStore(
    (state: { doctors: Doctor[] }) => state.doctors
  );

  const setAllDoctors = useDoctorStore(
    (state: { setAllDoctors: (doctors: Doctor[]) => void }) =>
      state.setAllDoctors
  );

  const specializationOptions = Array.isArray(specialization)
    ? specialization.map((special: Specialization) => ({
        label: special.name,
        value: special.id,
      }))
    : [];

  console.log('specializationOptions', specializationOptions);

  const fetchData = useCallback(async () => {
    try {
      const specializations = await getAllspecialization(1, 10);
      const doctorFilter = await getDoctorData(1, 10);
      console.log('specializations.records', specializations.records);

      setAllSpecialization(specializations.records);
      setAllDoctors(doctorFilter.records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [setAllDoctors, setAllSpecialization]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = [
    {
      title: 'B2B CLIENTS',
      value: '5',
      icon: Users,
      color: 'text-teal-500',
    },
    {
      title: 'TREATED PETS',
      value: '100+',
      icon: PawPrint,
      color: 'text-teal-500',
    },
    {
      title: 'ACCURACY',
      value: '97%',
      icon: Target,
      color: 'text-teal-500',
    },
  ];

  const categories = [
    { id: 1, name: 'BILES', image: Cate, alt: 'Fresh tomatoes' },
    { id: 2, name: 'FRESH SHELLFISH', image: Cate, alt: 'Fresh shellfish' },
    { id: 3, name: 'FRESH FRUITS', image: Cate, alt: 'Fresh oranges' },
    { id: 4, name: 'FRESH FISH', image: Cate, alt: 'Fresh salmon' },
    { id: 5, name: 'EGGS', image: Cate, alt: 'Fresh eggs' },
    { id: 6, name: 'CHEESE', image: Cate, alt: 'Cheese products' },
    { id: 7, name: 'BUTTER', image: Cate, alt: 'Butter products' },
    { id: 8, name: 'BEEF', image: Cate, alt: 'Beef products' },
  ];

  const services = [
    {
      id: 1,
      isMain: true,
      title: 'Doctor Channelling',
      subtitle: 'Channel a doctor',
      icon: (
        <div className="w-12 h-12 rounded-full bg-white/20 relative flex items-center justify-center">
          <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full" />
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      ),
    },
    {
      id: 2,
      title: 'ePremium',
      subtitle: 'Member Benefits',
      icon: (
        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-amber-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.2-6.3-4.8-6.3 4.8 2.3-7.2-6-4.6h7.6z" />
          </svg>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Driving License Medical',
      subtitle: 'Book an appointment',
      icon: (
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M21 16V6a1 1 0 00-1-1h-8"
            />
          </svg>
        </div>
      ),
    },
    {
      id: 4,
      title: 'IOM Visa Medical',
      subtitle: 'Pre-Migration Health Assessment',
      icon: (
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
      ),
    },
  ];

  const handleSearch = async () => {
    try {
      const specializationId = nameSpecialization?.value
        ? String(nameSpecialization.value)
        : '';


        const formattedDate = selectedDate ? selectedDate.toISOString() : ''; 
        const doctorFilter = await getDoctorData(1, 10, specializationId, formattedDate);
        
      if (
        doctorFilter &&
        doctorFilter.records &&
        doctorFilter.records.length > 0
      ) {
        // const url = {
        //   pathname: '/doctors',
        //   query: {
        //     specializationId: specializationId,
        //     date: formattedDate,
        //   },
        // };
        // const queryString = new URLSearchParams(url.query).toString();
        // router.push(`${url.pathname}?${queryString}`);
      } else {
        toast.error('No doctors found for the selected criteria...');
        alert('No doctors found for the selected criteria.');
      }
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  return (
    <>
      <main className="bg-white">
        <div className="flex flex-col items-center justify-between">
          <PetCareSection />
        </div>

        <div className="relative z-5 max-w-5xl px-4 pb-4 mt-6 mx-auto">
          <div className="flex flex-row justify-between space-x-4">
            <div className="bg-white rounded-lg shadow-lg p-4 flex-grow flex-shrink-0 w-full md:w-2/3">
              <div className="container mx-auto">
                <h3 className=" text-2xl font-bold mb-2">
                  Start Your Search Doctor
                </h3>
                <hr className="my-2 border-t-2 border-gray-300" />

                <div className="relative z-2 home-first w-full pt-4">
                  <section className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                      <FilterDropdown
                        options={specializationOptions}
                        placeholder="👩‍⚕️ Select Specialization"
                        onChange={setSelectedSpecialization}
                        value={nameSpecialization}
                      />

                      <div className="relative">
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <button className="bg-white border border-gray-500 rounded-lg px-4 py-2 w-full flex justify-between items-center text-sm font-medium hover:bg-gray-50">
                              {selectedDate
                                ? format(selectedDate, 'PPP')
                                : '📅 Select Date'}
                              <CalendarIcon className="h-4 w-4 text-gray-500" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="p-0 z-50">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={(date) => {
                                setSelectedDate(date);
                                setOpen(false);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <button
                        onClick={handleSearch}
                        // className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center group transition-colors"
                        className={`flex items-center justify-center group ${COLORS.bgPurple}  ${COLORS.hoverbgGreen} text-white font-medium py-2 px-4 rounded-md transition-colors`}
                      >
                        Search
                        <ArrowRight
                          className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                          size={20}
                        />
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto max-w-5xl py-8">
          {services?.map((service) => (
            <ServiceCard
              key={service.id}
              isMain={service.isMain}
              title={service.title}
              subtitle={service.subtitle}
              icon={service.icon}
            />
          ))}
        </div>

        <StatsCards stats={stats} />
        <CategoryGrid categories={categories} />
        <PetCareFeatures />

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-semibold text-gray-800">
                Top Specialists
              </h2>
              <HeartPulse className="w-6 h-6 text-red-500" />
            </div>
            <a
              href="/doctors"
              className="text-red-400 hover:underline font-medium"
            >
              See All
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors && doctors.length > 0 ? (
              doctors.map((doctor) => (
                <TopSpecialistCard
                key={doctor.id}
                specialist={{
                  id: Number(doctor.id),
                  userResponse: {
                    firstName: doctor.userResponse.firstName || '',
                    lastName: doctor.userResponse.lastName || '',
                    preSignedUrl: doctor.preSignedUrl ?? undefined,
                  },
                  specializationResponse: {
                    name: doctor.specializationResponse?.name || 'General Practitioner',
                  },
                }}
                onClick={() => console.log('Clicked:', doctor)}
              />
              
              ))
            ) : (
              <p className="text-gray-500">No specialists available</p>
            )}
          </div>
        </div>

        <TestimonialSlider />
        <div>
          <ProductShowcase />
          <PetCarePlan />
          <HeroSection />
        </div>
      </main>
    </>
  );
}
