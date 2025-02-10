'use client';

import { useDoctorStore } from '@/store/doctorStore';
import { format } from 'date-fns';
import { ArrowRight, CalendarIcon, Loader } from 'lucide-react';
import {  useEffect, useState,useCallback, Suspense } from 'react';
import debounce from 'lodash/debounce'; 
import { PopoverTrigger } from '@radix-ui/react-popover';
import { COLORS } from '../constants/color';
import { Popover, PopoverContent } from '@/components/ui/popover';
import DoctorsCard from '@/components/Doctor/DoctorsCard';
import { getDoctorData } from '@/api/Doctor/route';
// import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

// interface Doctor {
//   preSignedUrl: string;
//   image: string;
//   name: string;
//   description: string;
// }

const Doctors = () => {
  // const searchParams = useSearchParams();
  // const searchParamsspecializationId = searchParams.get('specializationId');
  // const searchParamsdate = searchParams.get('date');
  
  // Set the types properly to avoid `any`
  const [docName, setDocName] = useState<string>('');
  const [selectedDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const allDoctors = useDoctorStore((state) => state.doctors);
  const setAllDoctors = useDoctorStore((state) => state.setAllDoctors);
  const loading = useDoctorStore((state) => state.loading);
  const setLoading = useDoctorStore((state) => state.setLoading);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    if (selectedDate) {
      handleFilterClick();
    }
  }); 
  


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const filterResponse = await getDoctorData(
          1,
          10,
          // searchParamsspecializationId || undefined,
          // searchParamsdate || undefined
        );
        setAllDoctors(filterResponse?.records || []);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    // if (searchParamsspecializationId || searchParamsdate) {
      fetchDoctors();
    // }
  }, [ setAllDoctors, setLoading]); 
  
  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const petData = await getPetData();
  //     const departmentData = await getDepartmentData();
  //     const specializations = await getAllspecialization(1, 10);
  //     setAllPets(petData);
  //     setAllDepartments(departmentData);
  //     setAllSpecialization(specializations);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

 
  const handleFilterClick = useCallback(() => {
    const debouncedFilter = debounce(async () => {
      const date = selectedDate ? format(new Date(selectedDate), 'yyyy-MM-dd') : undefined;
      try {
        setLoading(true);
        const filterResponse = await getDoctorData(
          1,
          10,
          undefined,
          date
        );
        setAllDoctors(filterResponse?.records || []);
      } catch (error) {
        console.log('Error:', error);
        toast.error('Error fetching filtered data');
      } finally {
        setLoading(false);
      }
    }, 500);

    debouncedFilter();
    
    // Clean up the debounced function
    return () => {
      debouncedFilter.cancel();
    };
  }, [selectedDate, setLoading, setAllDoctors]);
  
  // const departmentOptions = departments?.map((dept) => ({
  //   label: dept.name,
  //   value: dept.id,
  // }));

  // const specializationOptions = specialization?.map((spec) => ({
  //   label: spec.specializationName,
  //   value: spec.id,
  // }));

  // const petsOptions = pets?.map((pet) => ({
  //   label: pet.name,
  //   value: pet.id,
  // }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-10 w-10" />
      </div>
    );
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    setDocName(inputDate);
  };

  return (
    <div className="py-8 w-full container pt-20 pb-20 px-0 md:px-7 mx-auto">
      <div className="bg-white rounded-lg mt-10 shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search doctors"
            value={docName}
            onChange={handleDateChange}
            className="block w-full px-3 py-2 border rounded-md focus:ring-indigo-500"
          />

          {/* <FilterDropdown
            options={specializationOptions}
            placeholder="👩‍⚕️ Specialization"
            onChange={setSelectedSpecialization}
            value={nameSpecialization}
          />

          <FilterDropdown
            options={departmentOptions}
            placeholder="👩‍⚕️ Department"
            onChange={setSelectedDeparment}
            value={selectedDeparment}
          />

          <FilterDropdown
            options={petsOptions}
            placeholder="👩‍⚕️ Pet"
            onChange={setSelectedPet}
            value={selectedPet}
          /> */}

          <div className="relative">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className="bg-white border rounded-lg px-4 py-2 w-full flex justify-between items-center">
                  {selectedDate ? format(selectedDate, 'PPP') : '📅 Select Date'}
                  <CalendarIcon className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0 z-50">
                {/* <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setOpen(false);
                  }}
                  initialFocus
                /> */}
              </PopoverContent>
            </Popover>
          </div>

          <button
            onClick={handleFilterClick}
            className={`flex items-center justify-center group ${COLORS.bgPurple} ${COLORS.hoverbgGreen} text-white font-medium py-2 px-4 rounded-md transition-colors`}
          >
            Search
            <ArrowRight
              className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
              size={20}
            />
          </button>
        </div>
      </div>
      <Suspense fallback={<div>Loading page...</div>}>
      <DoctorsCard
        title="Popular Doctors"
        description="Meet With Professional Doctors."
        doctors={allDoctors}
      />
        </Suspense>
    </div>
  );
};

export default Doctors;
