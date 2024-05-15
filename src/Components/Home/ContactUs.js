import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import contactImg from "../../assets/contact-us.png";

const ContactUs = () => {
  return (
    <section className="my-8 px-10">
      <div className="text-center mb-6">
        <h2 className="text-4xl mb-2 text-green-600 font-bold">Contact Us</h2>
      </div>
      <div className="w-full flex_block gap-4">
        <div className="w-full md:w-2/5 lg:w-4/6">
          <img src={contactImg} alt="" className="" />
        </div>
        <div className="w-full md:w-2/5 lg:w-4/6 p-4">
          <div className="mb-5">
            <h4 className="text-2xl font-semibold">Get In Touch</h4>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="input w-full bg-white mb-2 input-bordered"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="input w-full mb-2 input-bordered bg-white"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Subject"
                className="input w-full mb-2 input-bordered bg-white"
              />
            </div>
            <div>
              <textarea
                className="textarea w-full mb-4 input-bordered bg-white"
                placeholder="Your message"
                rows={4}
              ></textarea>
            </div>
            <div>
              <button className="btn btn-outline border-green-700 text-green-700 text-xl hover:border-black hover:bg-orange-500">
                Send Message{" "}
                <FontAwesomeIcon className="mx-4" icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
