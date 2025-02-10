import React from 'react';
import Image from 'next/image';
import appStore from '../../../public/images/appstore.png';
import playStore from '../../../public/images/playstore.png';
import petImage from '../../../public/images/pet2.png';

import { COLORS } from '@/app/constants/color';
import InfiniteScrollPartners from '../InfiniteScrollPartners/InfiniteScrollPartners';

import Awspng from '../../../public/images/aws.png';
import candapng from '../../../public/images/canda.png';
import Dmzpng from '../../../public/images/dmz.png';
import Nvidiapng from '../../../public/images/nvidia.png';
import Tbdcpng from '../../../public/images/tbdc.png';
import Tmupng from '../../../public/images/tmu.png';
import Torontopng from '../../../public/images/toronto.png';
import Tvzpng from '../../../public/images/tvz.png';

const PetCareSection = () => {
  const partners = [
    { name: 'AWS', image: Awspng, alt: 'AWS Logo' },
    { name: 'Canada', image: candapng, alt: 'Canada Logo' },
    { name: 'DMZ', image: Dmzpng, alt: 'DMZ Logo' },
    { name: 'NVIDIA', image: Nvidiapng, alt: 'NVIDIA Logo' },
    { name: 'TBDC', image: Tbdcpng, alt: 'TBDC Logo' },
    { name: 'TMU', image: Tmupng, alt: 'TMU Logo' },
    { name: 'Toronto', image: Torontopng, alt: 'Toronto Logo' },
    { name: 'TVZ', image: Tvzpng, alt: 'TVZ Logo' },
  ];
  return (
    // <div className="flex flex-col items-center max-w-5xl bg-yellow-500 p-4 justify-between ">
    //   <section className="relative h-[100dvh] flex items-center justify-center gap-36 p-4">
    //     {/* <div className="h-screen flex flex-col md:flex-row items-center justify-between max-w-full bg-cyan-700 mx-auto gap-8"> */}
    //       <div className="flex flex-col space-y-4 bg-red-600 max-w-xl">
    //         <h1 className="text-4xl md:text-6xl text-black font-bold tracking-tight">
    //           Talk to someone you can trust, anytime.
    //         </h1>

    //         <p className="text-gray-600 text-lg">
    //           Pawp puts a 24/7 team of veterinary doctors &amp; nurses in your
    //           back pocket. Whether you need a gut check, can&apos;t get an
    //           appointment, or just want expert advice — we&apos;ve got your
    //           back.
    //         </p>

    //         <p className="text-gray-800 font-medium text-lg">
    //           Try 1 month of Pawp free.
    //         </p>

    //         <button
    //           className={`${COLORS.bgPurple} w-full md:w-64 h-12  text-white rounded-full  ${COLORS.hoverbgGreen}`}
    //         >
    //           Try The App For Free
    //         </button>

    //         <div className="flex pt-2 gap-4">
    //           <button className=" text-white  py-2 rounded-lg flex items-center">
    //             <Image src={appStore} alt="Apple App Store" className="w-32" />
    //           </button>

    //           <button className=" text-white  py-2 rounded-lg flex items-center">
    //             <Image
    //               src={playStore}
    //               alt="Google Play Store"
    //               className="w-32"
    //             />
    //           </button>
    //         </div>
    //       </div>

    //       <div className="w-full md:w-1/2 relative">
    //         <Image
    //           src={petImage}
    //           alt="Veterinary professional hugging a happy cream-colored dog"
    //           className="w-full h-auto rounded-lg object-cover"
    //         />
    //       </div>
    //     {/* </div> */}
    //   </section>
    // </div>

    <div className="w-full bg-white">
      <div className="max-w-5xl mx-auto p-4">
        <section className="min-h-[100dvh] flex flex-col">
          <div className="flex flex-col md:flex-row items-center pt-10 justify-between gap-8 flex-1">
            <div className="flex flex-col space-y-4 max-w-xl">
              <h1 className="text-4xl md:text-6xl text-black font-bold tracking-tight">
                Talk to someone you can trust, anytime.
              </h1>

              <p className="text-gray-600 text-lg">
                Pawp puts a 24/7 team of veterinary doctors &amp; nurses in your
                back pocket. Whether you need a gut check, can&apos;t get an
                appointment, or just want expert advice — we&apos;ve got your
                back.
              </p>

              <p className="text-gray-800 font-medium text-lg">
                Try 1 month of Pawp free.
              </p>

              <button
                className={`${COLORS.bgPurple} w-full md:w-64 h-12 text-white rounded-full ${COLORS.hoverbgGreen}`}
              >
                Try The App For Free
              </button>

              <div className="flex pt-2 gap-4">
                <button className="text-white py-2 rounded-lg flex items-center">
                  <Image
                    src={appStore}
                    alt="Apple App Store"
                    className="w-32"
                  />
                </button>

                <button className="text-white py-2 rounded-lg flex items-center">
                  <Image
                    src={playStore}
                    alt="Google Play Store"
                    className="w-32"
                  />
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <Image
                src={petImage}
                alt="Veterinary professional hugging a happy cream-colored dog"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>

          <div className="pb-4">
            <InfiniteScrollPartners partners={partners} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PetCareSection;
