import React from "react";
import PropTypes from "prop-types";

const tops = [
  {
    title: "Fast & Free Shipping",
    icon: "https://untree.co/demos/furni/images/truck.svg",
    subtitle: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
  },
  {
    title: "Easy to Shop",
    icon: "	https://untree.co/demos/furni/images/bag.svg",
    subtitle: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
  },
  {
    title: "24/7 Support",
    icon: "https://untree.co/demos/furni/images/support.svg",
    subtitle: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
  },
  {
    title: "Hassle Free Returns",
    icon: "https://untree.co/demos/furni/images/return.svg",
    subtitle: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
  },
];

const AS = (props) => {
  return (
    <div className="space-y-5">
      <h2 className="text-lg uppercase">Why Choose Us</h2>
      <span className="text-sm text-gray-400">
        Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor
        tempor tristique.
      </span>
      <div className="grid-layout">
        <div className="row">
          <div className="col l-7 s-12 c-12">
            <div className="grid grid-cols-2 gap-5">
              {tops.map((top) => {
                return (
                  <div className="flex flex-col gap-2" key={top?.title}>
                    <figure className="w-12 h-12 relative">
                      <img src={top?.icon} alt={top?.icon} />
                      <span className="absolute w-6 h-6 bg-[#3b5d5066] z-10 top-[50%] right-0 rounded-full"></span>
                    </figure>
                    <h4 className="text-base font-medium text-third">{top?.title}</h4>
                    <p className="text-sm font-medium text-gray-500">{top?.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col l-5 s-12 c-12">
            <div className="w-full h-full relative p-5 max-xs:p-2 mt-8">
              <figure className="w-full h-full rounded-2xl overflow-hidden">
                <img src="https://untree.co/demos/furni/images/why-choose-us-img.jpg" alt="" />
              </figure>
              <div
                style={{
                  position: "absolute",
                  backgroundImage: "url('https://untree.co/demos/furni/images/dots-yellow.svg)",
                  width: "255px",
                  height: "217px",
                  backgroundSize: "containe",
                  backgroundRepeat: "no-repeat",
                  top: 0,
                  left: 0,
                  transform: "translate(-20%, -20%)",
                  zIndex: -1,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AS.propTypes = {};

export default AS;
