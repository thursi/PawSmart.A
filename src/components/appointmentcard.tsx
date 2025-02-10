import React, { useState } from 'react';
import { Card, CardContent, } from '@/components/ui/card';
import {
  Calendar,
  Clock,
  FilePenLine,
  Video,
} from 'lucide-react';
import { COLORS } from '@/app/constants/color';
import ConfirmationDialog from './ConfirmationDialog';
import { cancelBooking } from '@/api/Appointment/route';
import { toast } from 'sonner';

// components/appointmentcard.tsx - Add export to the interfaces
export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  preSignedUrl: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  role: string | null;
  active: boolean;
}

export interface SpecializationResponse {
  id: number;
  name: string;
  active: boolean;
}

export interface DoctorResponse {
  id: number;
  userResponse: UserResponse;
  specializationResponse: SpecializationResponse;
  bio: string;
  qualification: string;
  experience: string;
  paymentPerSession: number;
  consultationDuration: number;
  dayTimeSlotResponses: unknown | null;
  verified: boolean;
}

export interface PetResponse {
  id: number;
  name: string;
  petType: string;
  breed: string;
  age: number;
  weight: number;
  medicalConditions: string[];
  userId: number | null;
  genderType: 'MALE' | 'FEMALE';
  image: string;
  createdDate: string | null;
  updatedDate: string | null;
  active: boolean;
}

export interface Appointment {
  id: string;
  bookingTime: string;
  doctorResponse: DoctorResponse;
  userResponse: UserResponse;
  petResponse: PetResponse;
  bookingDate: string;
  bookingStatus: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  medium: 'VIRTUAL' | 'IN_PERSON';
  reason: string;
  note: string;
  createdDate: string;
  updatedDate: string;
}

// Rest of your AppointmentCard component code remains the same...
interface AppointmentCardProps {
  AppointmentList: Appointment[];
  handleClick: (doctorId: number) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  AppointmentList,
  // handleClick,
}) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment>(); 

  const groupedAppointments = AppointmentList.reduce((acc, appointment) => {
    const date = new Date(appointment.bookingDate);
    const monthYear = date.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(appointment);
    return acc;
  }, {} as Record<string, Appointment[]>);

  const handleEditClick = (appointment: Appointment) => {
    setAppointmentToCancel(appointment);
    setIsDialogOpen(true);
  };

  const handleCancelAppointment = async () => {
    if (appointmentToCancel) { 
      const response = await cancelBooking(appointmentToCancel.id);
    if (response.success) {
      toast.success(response.message);
      setIsDialogOpen(false);
    } else {
      toast.error(response.message);
      setIsDialogOpen(false);
    }
    setIsDialogOpen(false);

    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedAppointments).map(([monthYear, appointments]) => (
        <div key={monthYear}>
          <div className="mb-4 flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">{monthYear}</h2>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {appointments.length} Appointments
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {appointments.map((appointment, index) => (
              <Card
                key={index}
                className="relative overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className={`absolute left-0 top-0 w-1 h-full ${COLORS.bgGreen}`}
                />
                <CardContent className="p-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Dr. {appointment.doctorResponse.userResponse.firstName}{' '}
                      {appointment.doctorResponse.userResponse.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      specialization in{' '}
                      {appointment.doctorResponse.specializationResponse.name}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Pet:</span>
                      <span className="ml-2">
                        {appointment.petResponse.name}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {new Date(appointment.bookingDate).toLocaleDateString()}
                      </span>
                      <Clock className="w-4 h-4 ml-4 mr-2" />
                      <span>{appointment.bookingTime}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Video className="w-4 h-4 mr-2" />
                        <span>{appointment.medium}</span>
                      </div>
                      <span
                        className={`px-3 py-1  text-xs font-medium rounded-full
                        ${
                          appointment.bookingStatus === 'CONFIRMED'
                            ? 'text-green-700 bg-green-100'
                            : appointment.bookingStatus === 'PENDING'
                            ? 'text-yellow-700 bg-yellow-100'
                            : 'text-red-700 bg-red-100'
                        }`}
                      >
                        {appointment.bookingStatus}
                        <button
                          className="ml-2 text-gray-500 hover:text-gray-700"
                          onClick={() => handleEditClick(appointment)}
                        >
                          <FilePenLine className="w-4 h-4" />
                        </button>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleCancelAppointment}
        message={`Are you sure you want to cancel the appointment with Dr. ${appointmentToCancel?.doctorResponse.userResponse.firstName} ${appointmentToCancel?.doctorResponse.userResponse.lastName}?`}
      />
    </div>
  );
};

export default AppointmentCard;
