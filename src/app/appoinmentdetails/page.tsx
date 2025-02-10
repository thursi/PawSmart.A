'use client';

import React, { useCallback, useEffect } from 'react';
import { useDoctorStore } from '@/store/doctorStore';
import { useAuthStore } from '@/store/authStore';
import { getAppointmentBookingFilterData } from '@/api/Appointment/route';
import ConsultationDetails from '@/components/appoinmentdetails';

const Page = () => {
  const login = useAuthStore((state) => state.login);
  console.log('login', login?.userId);

  const doctorfiltAppointments = useDoctorStore(
    (state) => state.doctorfiltAppointments
  );
  console.log('doctorfiltAppointments', doctorfiltAppointments);
  
  const setDoctorAppointments = useDoctorStore(
    (state) => state.setDoctorAppointments
  );
  const getAppointmentDetails = useCallback(async () => {
    try {
      const filterAppointmentList = await getAppointmentBookingFilterData({
        pageSize: 10,
        pageCount: 1,
        userId:  Number(login?.userId) || 4, 
      });

      setDoctorAppointments(filterAppointmentList?.records || []);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  }, [login?.userId, setDoctorAppointments]);

  useEffect(() => {
    getAppointmentDetails();
  }, [getAppointmentDetails]);

  const sampleConsultationData = [{
    "id": 28,
    "bookingTime": "09:30:00",
    "doctorResponse": {
      "id": 156,
      "userResponse": {
        "id": 789,
        "firstName": "Ana Maria",
        "lastName": "Estrada Enriquez",
        "email": "ana.estrada@medical.com",
        "phoneNo": "+1 (555) 123-4567",
        "dateOfBirth": "1985-06-15",
        "gender": "Female",
        "preSignedUrl": "/api/placeholder/48/48",
        "createdDate": "2024-01-01T08:00:00.000Z",
        "updatedDate": "2024-01-01T08:00:00.000Z",
        "online": true,
        "role": {
          "id": 2,
          "name": "DOCTOR"
        },
        "active": true
      },
      "specializationResponse": {
        "id": 12,
        "name": "Medicina General",
        "active": true
      },
      "bio": "Especialista en medicina general con 15 años de experiencia",
      "qualification": "MD, Board Certified",
      "experience": "15 years",
      "paymentPerSession": 150,
      "consultationDuration": 30,
      "dayTimeSlotResponses": [
        {
          "day": "MONDAY",
          "timeSlots": [
            {
              "startTime": "09:00:00",
              "endTime": "17:00:00",
              "hospitalId": 1,
              "hospitalName": "Centro Médico Nacional",
              "mediumList": ["VIRTUAL"],
              "appointmentTimeResponses": [
                {
                  "id": 1,
                  "appointmentTime": "09:30:00"
                }
              ]
            }
          ]
        }
      ],
      "verified": true
    },
    "userResponse": {
      "id": 456,
      "firstName": "Juan Jose",
      "lastName": "Lizcano Tovar",
      "email": "jlizcano@teker.co",
      "phoneNo": "+1 (555) 987-6543",
      "dateOfBirth": "1990-03-22",
      "gender": "Male",
      "preSignedUrl": "/api/placeholder/48/48",
      "createdDate": "2024-02-01T10:30:00.000Z",
      "updatedDate": "2024-02-01T10:30:00.000Z",
      "online": false,
      "role": {
        "id": 1,
        "name": "PATIENT"
      },
      "active": true
    },
    "petResponse": {
      "id": 789,
      "name": "Max",
      "petType": "Dog",
      "breed": "Golden Retriever",
      "age": 5,
      "weight": 30,
      "medicalConditions": [
        "Allergies",
        "Joint pain"
      ],
      "userResponse": {
        "id": 456,
        "firstName": "Juan Jose",
        "lastName": "Lizcano Tovar",
        "email": "jlizcano@teker.co",
        "phoneNo": "+1 (555) 987-6543",
        "dateOfBirth": "1990-03-22",
        "gender": "Male",
        "preSignedUrl": "/api/placeholder/48/48",
        "createdDate": "2024-02-01T10:30:00.000Z",
        "updatedDate": "2024-02-01T10:30:00.000Z",
        "online": false,
        "role": {
          "id": 1,
          "name": "PATIENT"
        },
        "active": true
      },
      "genderType": "MALE",
      "image": "/api/placeholder/200/200",
      "healthRecords": [
        {
          "id": 123,
          "pastTreatments": [
            "Annual vaccination",
            "Dental cleaning"
          ],
          "petDocuments": [
            {
              "mediaUrl": "/api/placeholder/300/200",
              "mediaType": "IMAGE"
            }
          ]
        }
      ],
      "createdDate": "2024-02-01T10:30:00.000Z",
      "updatedDate": "2024-02-01T10:30:00.000Z",
      "active": true
    },
    "bookingDate": "2024-08-24",
    "bookingStatus": "CONFIRMED",
    "medium": "VIRTUAL",
    "reason": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consequat lectus pretium interdum tempus. Curabitur in metus turpis. Sed quis felis a massa mollis feugiat.",
    "note": "Patient requested evening appointment",
    "createdDate": "2024-02-07T08:23:43.415Z",
    "updatedDate": "2024-02-07T08:23:43.415Z"
  }];
  
  
  return (
    <main className="bg-white py-8">
      <div className="flex flex-col items-center justify-between">
        <div className="container mx-auto mt-16 max-w-7xl">
          <ConsultationDetails consultationData={sampleConsultationData[0]} />
        </div>
      </div>
    </main>
  );
  
};

export default Page;
