'use client';

import React, { useCallback, useEffect } from 'react';
import { useDoctorStore } from '@/store/doctorStore';
import { useAuthStore } from '@/store/authStore';
import { getAppointmentBookingFilterData } from '@/api/Appointment/route';
import AppointmentCard from '@/components/appointmentcard';
const Page = () => {
  const login = useAuthStore((state) => state.login);

  const doctorfiltAppointments = useDoctorStore(
    (state) => state.doctorfiltAppointments
  );
  

  const setDoctorAppointments = useDoctorStore(
    (state) => state.setDoctorAppointments
  );

  const getAppointmentDetails = useCallback(async () => {
    try {
      const filterAppointmentList = await getAppointmentBookingFilterData({
        pageSize: 10,
        pageCount: 1,
        userId: Number(login?.userId),
      });

      if (filterAppointmentList?.records) {
        setDoctorAppointments(filterAppointmentList.records);
      }
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  }, [login?.userId, setDoctorAppointments]);

  useEffect(() => {
    getAppointmentDetails();
  }, [getAppointmentDetails]);

  return (
    <main className="bg-white py-8">
      <div className="flex flex-col items-center justify-between">
        <div className="container mx-auto mt-16 max-w-7xl">
          <AppointmentCard
            AppointmentList={doctorfiltAppointments}
            handleClick={(doctorId: number) => {
              console.log('Doctor ID:', doctorId);
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default Page;