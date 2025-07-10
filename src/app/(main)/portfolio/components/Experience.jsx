'use client';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {motion, useInView} from 'framer-motion';
import {styles} from '../styles';
import {fadeIn, textVariant} from '@/utils/motion';
import {experiences} from '@/utils/constants';
import {SectionWrapper} from '../hoc';
import Image from 'next/image';
import {useEffect, useRef} from 'react';

const Experience = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const hiddenElements = document.querySelectorAll('.is-hidden');
      hiddenElements.forEach(el => {
        el.classList.remove('is-hidden');
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>LÀM VIỆC</p>
        <h2 className={`${styles.sectionHeadText}`}>Kinh nghiệm làm việc.</h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

const ExperienceCard = ({experience}) => {
  return (
    <VerticalTimelineElement
      contentStyle={{background: '#1d1836', color: '#fff'}}
      contentArrowStyle={{borderRight: '7px solid #232631'}}
      date={experience.date}
      iconStyle={{background: experience.iconBg}}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <Image
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p className='text-muted-foreground text-[16px] font-semibold' style={{margin: 0}}>{experience.company_name}</p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li key={`experience-point-${index}`} className='text-white-100 text-[14px] pl-1 tracking-wider'>
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  )
}

export default SectionWrapper(Experience, "experience");