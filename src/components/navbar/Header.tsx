'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logoeffect from '../../../public/images/logopawsmart.png';
import Image from 'next/image';
import { COLORS } from '@/app/constants/color';
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from '@/api/Auth/route';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import SignInDialog from '../auth/SignInDialog';
import ForgotPasswordDialog from '../auth/ForgotPasswordDialog';
import SignupDialog from '../auth/SignupDialog';
import { toast } from 'sonner';
import ResetPasswordDialog from '../auth/ResetPasswordDialog';

interface ForgotPasswordFormData {
  email: string;
}

interface ResetPasswordFormData {
  otp: string;
  password: string;
}
interface SignInFormData {
  userName: string;
  password: string;
}

interface SignupFormData {
  firstName: string;
  // lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: number;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isForgotpasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 64) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setLogin = useAuthStore((state) => state.setLogin);

  async function onSubmitForgotPassword(values: ForgotPasswordFormData) {
    const response = await forgotPassword(values.email);
    if (response.success) {
      toast.success(response.message);
      setIsResetPasswordOpen(true);
    } else {
      toast.error(response.message);
    }
  }

  async function onSubmitResetPassword(values: ResetPasswordFormData) {
    const response = await resetPassword({
      otp: values?.otp,
      password: values?.password,
    });

    if (response.success) {
      toast.success(response.message);
      setIsForgotPasswordOpen(false);
      setIsDialogOpen(true);
      setIsResetPasswordOpen(false);
    } else {
      toast.error(response.message);
    }
  }

  async function onSubmit(values: SignupFormData) {
    try {
      
      const response= await registerUser(values);
      if (response.success === 'true') {
        setLogin(response);
        setIsSignupOpen(false);
        setIsForgotPasswordOpen(false);
        setIsResetPasswordOpen(false);
        setIsDialogOpen(false);

        toast.success(response.message);

        router.push('/');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred. Please try again.');
    }
  }

  const handleSignIn = async (data: SignInFormData) => {
    try {
      const response = await loginUser({
        userName: data.userName,
        password: data.password,
      });

      if (response.success) {
        setLogin(response);
        toast.success(response.message);
        setIsDialogOpen(false);
        router.push('/');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Oops! Something went wrong. Try again.');
      console.error('Sign-in failed:', error);
    } finally {
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white z-50 transition-all duration-300">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src={Logoeffect}
                  alt="pawsmart logo"
                  width={160}
                  height={38}
                />
              </Link>
              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  {/* {login && ( */}
                  <Link
                    href="/appointments"
                    className="text-gray-700  hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Appointments
                  </Link>
                  {/* )} */}
                  <div className="relative group">
                    <button className="text-gray-700  hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
                      Pet Parents
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="hidden group-hover:block absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          href="/partnerships"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Clinics/Malls
                        </Link>
                        <Link
                          href="/careers"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Join the community
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/blog"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact us
                  </Link>
                  <Link
                    href="/blog"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Shop
                  </Link>
                  <Link
                    href="/blog"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Payment plan
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                // href="/login"
                href="/"
                onClick={() => setIsDialogOpen(true)}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Log in
              </Link>

              <Link
                href="/try-free"
                className={`${COLORS.bgPurple} text-white px-4 py-2 rounded-md text-sm font-medium ${COLORS.hoverbgGreen}`}
              >
                Free Consultation
              </Link>
              <Link
                href="/joindoctor"
                className={`${COLORS.bgPurple} text-white px-4 py-2 rounded-md text-sm font-medium ${COLORS.hoverbgGreen}`}
              >
                Join as Doctor
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <SignInDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSignIn={(data) => {
            console.log(data);
            handleSignIn(data);
          }}
          onSignUp={() => {
            setIsForgotPasswordOpen(false);
            setIsDialogOpen(false);
            setIsSignupOpen(true);
            
          }}
          onForgotPassword={() => {
            setIsForgotPasswordOpen(true);
            setIsDialogOpen(false);
          }}
          loading={false}
        />

        <ForgotPasswordDialog
          isOpen={isForgotpasswordOpen}
          setIsOpen={setIsForgotPasswordOpen}
          onSubmit={onSubmitForgotPassword}
          loading={false}
        />

        <ResetPasswordDialog
          isOpen={isResetPasswordOpen}
          setIsOpen={setIsResetPasswordOpen}
          onSubmit={onSubmitResetPassword}
          loading={false}
        />

        <SignupDialog
          isSignupOpen={isSignupOpen}
          setIsSignupOpen={setIsSignupOpen}
          onSubmit={(data) => {
            console.log(data);
            onSubmit(data);
          }}
          // onDoctorSignUp={() => {
          //   setIsForgotPasswordOpen(false),
          //     setIsDialogOpen(false),
          //     setIsSignupOpen(false),
          //     setIsDoctor(true);
          // }}
          loading={false}
        />
        {/* <SignInDoc
          isOpen={isDoctor}
          onClose={setIsDoctor}
          calendarOpen={calendarOpen}
          setCalendarOpen={(value: SetStateAction<boolean>) => {
            setCalendarOpen(value);
          }}
          onDocSubmit={(data) => {
            setCalendarOpen(false);
            onDocSubmit(data)
          }}
        /> */}

        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Appointments
            </Link>
            <Link
              href="/partnerships"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Pet Parents
            </Link>
            <Link
              href="/careers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Clinics/Malls
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Join the community
            </Link>
            <Link
              href="/careers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Shop
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Payment plan
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <Link
                // href="/login"
                href="/"
                onClick={() => setIsDialogOpen(true)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Log in
              </Link>
              <Link
                href="/try-free"
                className={`${COLORS.bgPurple}block w-full px-4 py-2 text-center text-sm font-medium text-white rounded-md ${COLORS.hoverbgGreen}`}
              >
                {/* Try For  */}
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <nav
        className={`fixed w-full bg-white shadow-lg transition-transform duration-300 z-50 ${
          isScrolled ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={Logoeffect}
                alt="pawsmart logo"
                width={160}
                height={38}
              />
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                onClick={() => setIsDialogOpen(true)}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Log in
              </Link>
              <Link
                href="/try-free"
                className={`${COLORS.bgPurple} text-white px-4 py-2 rounded-md text-sm font-medium ${COLORS.hoverbgGreen}`}
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
