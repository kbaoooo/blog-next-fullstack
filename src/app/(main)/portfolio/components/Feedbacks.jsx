'use client';

import {motion} from 'framer-motion';
import {styles} from "../styles";
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '@/utils/motion';
import { testimonials } from '@/utils/constants';
import Image from 'next/image';

const Feedbacks = () => {
  return (
    <div className='mt-10 bg-black-500 rounded-2xl'>
      <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Feedback về tôi</p>
          <h2 className={styles.sectionHeadText}>Feedback.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {testimonials.map((feedback, index) => (
          <FeedbackCard 
            key={feedback.name}
            index={index}
            feedback={feedback}
          />
        ))}
      </div>
    </div>
  )
}

const FeedbackCard = (props) => {
  const { feedback, index } = props;
  const { name, designation, company, image, testimonial } = feedback;

  return (
    <motion.div
      variants={fadeIn('', 'spring', index * 0.5, 0.75)}
      className='bg-black-600 p-10 rounded-3xl md:w-[320px] w-full'
    >
      <p className='text-white font-black text-[48px]'>
        &quot;
      </p>
      <div className='mt-1'>
        <p className='text-white tracking-wider text-[18px]'>{testimonial}</p>
        <div className='mt-7 flex justify-between items-center gap-1'>
          <div className='flex-1 flex flex-col'>
            <p className='text-white font-medium text-[16px]'>
              <span className='blue-text-gradient'>@</span> {name}
            </p>
            <p className='mt-1 text-muted-foreground text-[12px]'>
              {designation} of {company}
            </p>
          </div>
          <Image 
            src={image}
            alt={`feedback_by-${name}`}
            className='w-10 h-10 rounded-full object-cover'
            width={40}
            height={40}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default SectionWrapper(Feedbacks, 'feedbacks');