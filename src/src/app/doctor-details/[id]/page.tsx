'use client';
import { getDoctorById } from '@/api/Doctor/route';
import DoctorDetails from '@/components/Doctor/DoctorDetails';
import { useDoctorStore } from '@/store/doctorStore';
import { use, useCallback, useEffect } from 'react';




const Index =({ params }: { params: Promise<{ id: string }> }) => {  
  // const doctorId = params?.id; 
  const { id } = use(params);
  const selectedDoctor = useDoctorStore((state) => state.selectedDoctor);
  const setSelectedDoctor = useDoctorStore((state) => state.setSelectedDoctor);
  const loading = useDoctorStore((state) => state.loading);
  
console.log("doctorId.............,doctorId",id );

const fetchData = useCallback(async () => {
  if (!id) return;
  try {
    const response = await getDoctorById(id);
    console.log("response:", response);
    if (response) {
      setSelectedDoctor(response);
    } else {
      console.error("Doctor not found");
    }
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
  }
}, [id, setSelectedDoctor]); 

useEffect(() => {
  if (id) {
    fetchData();
  }
}, [id, fetchData]); 
  return (
  
  <>
     <div className="container mt-16 mx-auto my-8">
      {loading ? (
        <div>Loading...</div>
      ) : selectedDoctor ? (
        <DoctorDetails doctor={selectedDoctor} />
      ) : (
        <div>Doctor not found.</div>
      )}
    </div>
  </>
 
  );
};

export default Index;
