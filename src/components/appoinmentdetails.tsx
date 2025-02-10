import React from 'react';
import { Calendar, Clock, User, Mail, FileText, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from "next/image";

interface Role {
  id: number;
  name: string;
}

interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  preSignedUrl: string;
  createdDate: string;
  updatedDate: string;
  online: boolean;
  role: Role;
  active: boolean;
}

interface SpecializationResponse {
  id: number;
  name: string;
  active: boolean;
}

interface AppointmentTimeResponse {
  id: number;
  appointmentTime: string;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
  hospitalId: number;
  hospitalName: string;
  mediumList: string[];
  appointmentTimeResponses: AppointmentTimeResponse[];
}

interface DayTimeSlotResponse {
  day: string;
  timeSlots: TimeSlot[];
}

interface DoctorResponse {
  id: number;
  userResponse: UserResponse;
  specializationResponse: SpecializationResponse;
  bio: string;
  qualification: string;
  experience: string;
  paymentPerSession: number;
  consultationDuration: number;
  dayTimeSlotResponses: DayTimeSlotResponse[];
  verified: boolean;
}

interface PetDocument {
  mediaUrl: string;
  mediaType: string;
}

interface HealthRecord {
  id: number;
  pastTreatments: string[];
  petDocuments: PetDocument[];
}

interface PetResponse {
  id: number;
  name: string;
  petType: string;
  breed: string;
  age: number;
  weight: number;
  medicalConditions: string[];
  userResponse: UserResponse;
  genderType: string;
  image: string;
  healthRecords: HealthRecord[];
  createdDate: string;
  updatedDate: string;
  active: boolean;
}

interface ConsultationData {
  id: number;
  bookingTime: string;
  doctorResponse: DoctorResponse;
  userResponse: UserResponse;
  petResponse: PetResponse;
  bookingDate: string;
  bookingStatus: string;
  medium: string;
  reason: string;
  note: string;
  createdDate: string;
  updatedDate: string;
}

interface ConsultationDetailsProps {
  consultationData: ConsultationData;
}

const ConsultationDetails: React.FC<ConsultationDetailsProps> = ({ consultationData }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <Button variant="ghost" className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Consulta {consultationData.id}
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 text-blue-500 bg-blue-50 rounded-md font-medium">
        Historial clinic
        </button>
        <button className="px-4 py-2 text-gray-600 rounded-md font-medium">
          Historial clínico
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
  <Image
    src={consultationData.doctorResponse?.userResponse?.preSignedUrl || "/api/placeholder/48/48"}
    alt="Doctor"
    width={48}
    height={48}
    className="w-full h-full object-cover"
  />
</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-medium">CITA PROGRAMADA</span>
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{formatDate(consultationData.bookingDate)} | {formatTime(consultationData.bookingTime)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Cancelar cita</Button>
          <Button variant="outline">Cambiar profesional</Button>
          <Button variant="outline" className="text-blue-500">Reagendar</Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Estado de cita</h3>
          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-md">
            {consultationData.bookingStatus}
          </span>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">
                  {consultationData.doctorResponse?.userResponse?.firstName} {consultationData.doctorResponse?.userResponse?.lastName}
                </h4>
                <p className="text-gray-600">{consultationData.doctorResponse?.specializationResponse?.name}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Fecha de cita agendada</p>
                    <p>{formatDate(consultationData.bookingDate)} | {formatTime(consultationData.bookingTime)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Estado de pago</p>
                    <p className="text-green-600">Aprobado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Nombre del paciente</p>
                  <p>{consultationData.userResponse?.firstName} {consultationData.userResponse?.lastName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Correo electrónico</p>
                  <p>{consultationData.userResponse?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Motivo de la consulta</p>
                  <p>{consultationData.reason}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationDetails;