"use client";

import React from 'react';
import Tilt from 'react-parallax-tilt';
import {motion} from 'framer-motion';
import {styles} from '../styles';
import {fadeIn, textVariant} from '@/utils/motion';
import {services} from '@/utils/constants';
import Image from 'next/image';
import {SectionWrapper} from '../hoc';

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>GIỚI THIỆU</p>
        <h2 className={`${styles.sectionHeadText}`}>Giới thiệu về mình.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 text-muted-foreground text-[17px] max-w-3xl leading-[30px]'
      >
        Mình là một lập trình viên web với hơn 2 năm kinh nghiệm trong việc phát triển ứng dụng web. Mình đã làm việc với nhiều công nghệ khác nhau, bao gồm React, Node.js, và MongoDB. Mình đam mê tạo ra những ứng dụng web đẹp mắt và hiệu quả, đồng thời luôn tìm kiếm cơ hội để học hỏi và cải thiện kỹ năng của mình.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service) => (
          <Tilt
            key={service.title}
            className='w-full xs:w-[250px] sm:w-[360px]'
            options={{
              max: 45,
              scale: 1,
              speed: 450,
            }}
          >
            <motion.div
              variants={fadeIn('right', 'spring', service.index * 0.5, 0.75)}
              className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
            >
              <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
                <Image
                  src={service.icon}
                  alt={service.title}
                  className='w-16 h-16 object-contain'
                />
                <h3 className='text-white text-[20px] font-bold text-center'>
                  {service.title}
                </h3>
                <p className='text-secondary text-[16px] text-center'>
                  {service.content}
                </p>
              </div>
            </motion.div>
          </Tilt>
        ))}    
      </div>
    </>
  )
}

export default SectionWrapper(About, 'about');