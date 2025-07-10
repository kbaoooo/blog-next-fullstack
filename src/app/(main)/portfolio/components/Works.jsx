"use client";

import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import {styles} from "../styles";
import {fadeIn, textVariant} from "@/utils/motion";
import { SectionWrapper } from "../hoc";
import { projects } from "@/utils/constants";
import { github } from '@/assets/images';
import Image from 'next/image';

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Công việc</p>
        <h2 className={styles.sectionHeadText}>
          Tôi đã làm gì trong những năm qua
        </h2>

        <div className='w-full flex'>
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className='mt-3 text-muted-foreground text-[17px] max-w-3xl leading-[30px]'
          >
            Dưới đây là một số dự án mà tôi đã làm trong những năm qua. Tôi đã làm việc với nhiều công nghệ khác nhau và đã học được rất nhiều điều từ mỗi dự án. Tôi hy vọng bạn thấy những dự án này thú vị và hữu ích.
          </motion.p>
        </div>

        <div className='mt-20 flex flex-wrap gap-7'>
          {projects.map((project, index) => (
            <ProjectCard 
              key={`project-${index}`}
              index={index}
              {...project}
            />
          ))}
        </div>
      </motion.div>
    </>
  )
}

const ProjectCard = (props) => {
  const { index, name, description, tags, image, source_code_link } = props;

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt 
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
        options={{
          max: 45,
          scale: 1,
          speed: 450
        }}
      >
        <div className='relative w-full h-[230px]'>
          <Image 
            src={image}
            alt={name}
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={source_code_link}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <Image 
                src={github}
                alt='github'
                className='w-1/2 h-1/2 object-contain'
              />
            </a>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-muted-foreground text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
}

export default SectionWrapper(Works, "works");