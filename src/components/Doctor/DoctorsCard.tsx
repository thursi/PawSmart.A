'use-client';
import { COLORS } from '@/app/constants/color';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DoctorCardProps {
  id?: string;
  preSignedUrl: string;
  gender: string;
  name: string;
  departmentName: string;
  specializationName?: string;
  petResponses?: { name: string }[];
  hospitalName?: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  preSignedUrl,
  gender,
  name,
  departmentName,
  specializationName,
  petResponses,
  hospitalName,
}) => {
  const defaultImage = '/department.png';
  const pathname = '/appointmentdoctor';

  return (
    <Link
      href={{
        pathname: `${pathname}${id ? `/${id}` : ''}`,
      }}
      passHref
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="cursor-pointer relative overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg rounded-lg p-4"
    >
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
          <Image
            src={preSignedUrl || defaultImage}
            alt={name}
            width={80}
            height={80}
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-2">{gender}</div>
      <div className="text-center text-lg text-black font-bold mt-2">{name}</div>
      {specializationName && (
        <div className="text-center text-sm text-gray-600">{specializationName}</div>
      )}
      {departmentName && (
        <div className="text-center text-sm text-gray-600">Department: {departmentName}</div>
      )}
      {petResponses && petResponses.length > 0 && (
        <div className="text-center text-sm text-gray-600">Pet: {petResponses[0].name}</div>
      )}
      {hospitalName && (
        <div className="text-center text-sm text-gray-600">Hospital: {hospitalName}</div>
      )}

      <div className="flex justify-center mt-4">
        <Link href={{ pathname: `${pathname}${id ? `/${id}` : ''}` }} passHref>
          <button
            className={`flex items-center justify-center group ${COLORS.bgPurple} ${COLORS.hoverbgGreen} text-white font-medium py-2 px-4 rounded-md transition-colors`}
          >
            See Now
            <ArrowRight
              className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
              size={20}
            />
          </button>
        </Link>
      </div>
    </Link>
  );
};

interface DoctorsCardProps {
  title: string;
  description: string;
  doctors: {
    id: string;
    userResponse?: {
      preSignedUrl?: string;
      firstName?: string;
      lastName?: string;
      gender?: string;
    };
    specializationResponse?: {
      name?: string;
    };
    petResponses?: { name: string }[];
    hospitalName?: string;
  }[];
}

const DoctorsCard: React.FC<DoctorsCardProps> = ({ title, description, doctors }) => {
  return (
    <div className="w-full container pt-20 pb-20 px-0 md:px-7 mx-auto">
      <div className="border-l-2 border-red-500 pl-2">
        <h2 className="font-bold text-black text-2xl">{title}</h2>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-l text-gray-600 border-l-2 border-white-500 pl-2">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-5">
        {doctors?.map((doctor, index) => (
          <DoctorCard
            key={index}
            id={doctor.id}
            preSignedUrl={doctor.userResponse?.preSignedUrl || '/department.png'}
            name={`${doctor.userResponse?.firstName || ''} ${doctor.userResponse?.lastName || ''}`}
            gender={doctor.userResponse?.gender || 'Unknown'}
            departmentName={doctor.specializationResponse?.name || 'General'}
            specializationName={doctor.specializationResponse?.name || 'Specialist'}
            petResponses={doctor.petResponses}
            hospitalName={doctor.hospitalName}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorsCard;
