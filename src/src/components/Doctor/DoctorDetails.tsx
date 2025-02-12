import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Doctor } from '@/lib/typings';

// interface Specialization {
//   name: string;
// }

// interface UserResponse {
//   firstName: string;
// }

// interface Pet {
//   preSignedUrl: string;
//   name: string;
//   description: string;
// }

// interface Hospital {
//   hospitalName: string;
//   services: string[];
// }

// interface Doctor {
//   id: string;
//   preSignedUrl: string;
//   userResponse: UserResponse;
//   specializationResponse: Specialization;
//   description: string;
//   petResponses?: Pet[];
//   hospitalDetails?: Hospital[];
// }

interface DoctorDetailsProps {
  doctor: Doctor | null;
}

const DoctorDetails: React.FC<DoctorDetailsProps> = ({ doctor }) => {
  console.log('doctor.....................', doctor);
  const defaultImage = '/department.png';
  if (!doctor) {
    return <div>Doctor not found.</div>;
  }
  const pathname = '/appointmentdoctor';
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
          <Image
            src={doctor.preSignedUrl || defaultImage}
            alt={doctor?.userResponse?.firstName || 'Doctor'}
            className="w-24 h-24 rounded-full mb-4"
            width={96}
            height={96}
          />
          <h2 className="text-xl font-bold text-center">{doctor?.userResponse?.firstName}</h2>
          <p className="text-sm text-gray-600 text-center">
            {doctor?.specializationResponse?.name || 'Specialization N/A'}
          </p>

          <p className="text-sm text-gray-600 text-center">
            {doctor.description}
          </p>
          <Link
            href={{
              pathname: `${pathname}${doctor.id ? `/${doctor.id}` : ''}`,
              query: doctor ? { doctorId: doctor.id } : undefined,
            }}
            passHref
          >
            <button className="flex items-center justify-center group bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Booking Now
              <ArrowRight
                className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                size={20}
              />
            </button>
          </Link>
        </div>

        <div className="flex-grow">
          {doctor.petResponses && doctor.petResponses.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4">Pets</h3>
              <div className="flex flex-col gap-4">
                {doctor.petResponses.map((pet, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center gap-4"
                  >
                    <Image
                      src={pet.preSignedUrl || '/placeholder.png'}
                      alt={pet.name}
                      className="w-16 h-16 rounded-full"
                      width={64}
                      height={64}
                    />
                    <div>
                      <h4 className="text-lg font-bold">{pet.name}</h4>
                      <h4 className="text-sm text-gray-600 text-center">
                        {pet.description}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {doctor.hospitalDetails && doctor.hospitalDetails.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-4">Hospitals & Services</h3>
          <div className="flex flex-col gap-4">
            {doctor.hospitalDetails.map((hospital, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-start"
              >
                <div>
                  <h4 className="text-lg font-bold">{hospital.hospitalName}</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {hospital.services.map((service, idx) => (
                      <li key={idx} className="text-sm">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Channel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;
