"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "@/utils/motion";
import emailjs from "@emailjs/browser";
import { EarthCanvas } from "./canvas";

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Sending email...", form);
    
    // yRujF4o67sj-ysotP
    // template_j9fkbeo
    // service_ns8hb1p

    emailjs.send('service_ns8hb1p', 'template_j9fkbeo', {
      from_name: form.name,
      to_name: "KhanhBao",
      from_email: form.email,
      to_email: "nbaokhanh1243@gmail.com",
      message: form.message,
    }, 'yRujF4o67sj-ysotP')
      .then(() => {
        setLoading(false);
        alert("Cảm ơn bạn đã liên hệ với tôi!");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        alert("Đã có lỗi xảy ra, vui lòng thử lại sau.");
      });
  }

  return (
    <div className="md:mt-12 flex flex-col-reverse md:flex-row gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-500 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Liên hệ</p>
        <h3 className={styles.sectionHeadText}>Liên hệ với tôi.</h3>

        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Tên</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Bạn tên là gì?"
              className="bg-tertiary py-4 px-6 placeholder:text-muted-foreground text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Email</span>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              className="bg-tertiary py-4 px-6 placeholder:text-muted-foreground text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Tên</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Gửi gì đó cho tôi :)"
              className="bg-tertiary resize-none py-4 px-6 placeholder:text-muted-foreground text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-4 px-6 outline-none w-fit text-white font-bold shadow-white/20 shadow-sm rounded-xl"
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "Gửi tin nhắn"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact");