import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import "react-awesome-slider/dist/custom-animations/fold-out-animation.css";
import "react-awesome-slider/dist/styles.css";
import { Collapse } from "react-collapse";
import GoogleFontLoader from "react-google-font";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { FaArrowRight, FaStar, FaUserCircle } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { GiCrystalGrowth } from "react-icons/gi";
import { TbCurrencyRupee } from "react-icons/tb";
import { InView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import h2 from "../../../../public/assets/h2.jpg";
import Category from "../../components/Category";
import Footer from "../../components/Footer";
import SidebarPages from "../../components/SidebarPages";
import BannerSlider from "../reuseableComponents/BannerSlider";
import BlogComponent from "../reuseableComponents/BlogComponent";
import Counter from "../reuseableComponents/Counter";
import Navbar from "../reuseableComponents/Navbar";
import StarRating from "../reuseableComponents/StarRating";

const ThirdTemplate = () => {
  const { branding: currBranding } = useSelector((state) => state.app);
  const [showSidebar, setShowSidebar] = useState(false);
  const [featured, setFeatured] = useState(currBranding?.sections?.mostSellingProduct || {});
  const [content, setContent] = useState(currBranding?.content || []);
  const [imageWithOverlay, setImageWithOverlay] = useState(
    currBranding?.sections?.imageWithOverlay || {}
  );
  const [dataSlate, setDataSlate] = useState(currBranding?.sections?.dataSlate || {});
  const [banners, setBanners] = useState(currBranding?.banners || []);
  const [featuredContent, setFeaturedContent] = useState(
    currBranding?.sections?.featuredContents || []
  );
  const [testimonials, setTestimonials] = useState(currBranding?.sections?.testimonials || []);
  const [faqs, setFaqs] = useState(currBranding?.sections?.faqs || []);
  const [hero, setHero] = useState(currBranding?.sections?.hero || {});
  const [footer, setFooter] = useState(currBranding?.sections?.footer || {});
  const [contact, setContact] = useState(currBranding?.sections?.contact || {});
  const [styles, setStyles] = useState(currBranding?.styles || {});
  console.log("🚀 ~ ThirdTemplate ~ styles:", styles);
  const [pages, setPages] = useState(currBranding?.pages || []);
  const { currentUser, cummunityProfile } = useSelector((state) => state.user);
  const { currSite } = useSelector((state) => state.app);
  console.log(currentUser, cummunityProfile, currSite);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const dispatch = useDispatch();
  const [showNav, setShowNav] = useState(false);

  let sliderRef = useRef(null);
  let testSliderRef = useRef(null);

  const [featuredActiveSlide, setFeaturedActiveSlide] = useState(0);
  const [showSlides, setShowSlides] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [stickNav, setStickNav] = useState(false);
  const [hideNav, setHideNav] = useState(false);

  const setHtmlWithStyle = (htmlString, className = "") => {
    // Regular expression to match all HTML tags
    const regex = /<[^>]*>/g;
    // Add 'text-base' class to each matched HTML tag
    const modifiedHtml = htmlString.replace(regex, (match) => {
      return match.replace(">", ` className="${className}">`);
    });
    return modifiedHtml;
  };

  const primaryColor = styles?.primary;
  const secondaryColor = styles?.secondary;
  const uiMode = styles?.uiMode;
  const innerText = styles?.innerTextMode;
  const font = styles?.font;
  const selectedColor = styles?.selectedColor || "solid";
  const from = styles?.gradient?.from;
  const via = styles?.gradient?.via;
  const to = styles?.gradient?.to;

  const inlineStyle = {
    fontFamily: font,
  };

  const handleShowNav = () => {
    setShowNav(!showNav);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (sliderRef.current) {
      setTimeout(() => {
        sliderRef.current.slickGoTo(0);
      }, 0);
    }
  }, []);

  return (
    <div
      className="relative bg-background"
      style={{ ...inlineStyle, "--primary": primaryColor }}
      data-theme={`${uiMode}`}
      id={"second-theme"}
    >
      <GoogleFontLoader fonts={[{ font: font || "poppins" }]} />
      <SidebarPages pages={pages} setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <Navbar
        setShowSidebar={setShowSidebar}
        currBranding={currBranding}
        selectedColor={selectedColor}
        primaryColor={primaryColor}
        from={from}
        pages={pages}
      />

      {/* home banner section  */}
      <BannerSlider images={banners} />

      {/* section  */}

      <div className="bg-background pt-4 overflow-hidden">
        {/* featured section  */}

        {featured?.title != null && (
          <div className="mt-12 mx-8 text-base">
            <p className="font-extrabold text-2xl text-center">Our top picks for you</p>
            <div className="text-sm text-muted text-center mt-2 font-bold">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas, tempore
            </div>
            <div className="my-8 md:flex gap-12 md:my-14 border border-gray-300 p-8  max-sm:p-0">
              <div className="md:basis-[50%]">
                <img
                  onError={(e) =>
                  (e.target.src =
                    "https://www.tobyajenkins.com/assets/uploads/Rework-front-cover.png")
                  }
                  src={featured?.thumbnail}
                  className=""
                  alt=""
                />
              </div>
              <div className="mt-4 md:basis-[50%] flex flex-col gap-2 max-sm:p-8 max-sm:py-4">
                <div className=" text-2xl ">
                  <h1>{featured.title}</h1>
                  <div
                    className="mt-1 pb-1 text-sm font-light"
                    dangerouslySetInnerHTML={{
                      __html: setHtmlWithStyle(
                        featured.description?.length > 100
                          ? featured.description.substring(0, 100) + " ..."
                          : featured.description
                      ),
                    }}
                  ></div>

                  <div className=" flex items-center gap-2">
                    <b className="mt-1 text-sm">{featured?.rating}</b>
                    <StarRating rating={featured?.rating} color={secondaryColor} />
                  </div>
                  <div className="flex items-center gap-1 mt-4">
                    <TbCurrencyRupee />
                    {featured?.price}
                  </div>
                </div>

                <div className="mt-4 text-base">
                  <div>
                    <Link
                      onClick={() => {
                        dispatch(setContent(featured));
                        window.scrollTo(0, 0);
                      }}
                      to={`/${currSite.toLowerCase()}/${featured._id}`}
                      style={{
                        background:
                          selectedColor === "solid"
                            ? primaryColor
                            : `linear-gradient(to right, ${from},${via},${to})`,
                        color: innerText,
                      }}
                      className="p-2  rounded-md inline-block"
                    >
                      Explore Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <Separator className="mt-8" /> */}

        <Category
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          primaryColor={primaryColor}
          innerText={innerText}
        />

        {content?.length > 0 ? (
          <div className=" rounded-3xl mx-8 p-8">
            <h2 className="!text-2xl font-medium text- mb-8 text-base my-4">
              Top Courses for you.
            </h2>

            <div className=" relative">
              <div className="slider-container">
                {content?.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {content
                      ?.filter((item) =>
                        selectedCategory === "all"
                          ? item
                          : item?.category === selectedCategory.toLocaleLowerCase()
                      )
                      .map((item, index) => (
                        <Link
                          key={index}
                          onClick={() => {
                            dispatch(setContent(item));
                            window.scrollTo(0, 0);
                          }}
                          to={`/${currSite.toLowerCase()}/${item?.id}`}
                          className=" inline-block text-base  h-auto my-8 rounded-xl overflow-hidden mx-auto cursor-pointer border-2 border-gray-200"
                        >
                          <div className="overflow-hidden">
                            <img
                              onError={(e) =>
                              (e.target.src =
                                "https://www.tobyajenkins.com/assets/uploads/Rework-front-cover.png")
                              }
                              className="w-full h-auto aspect-video"
                              src={item?.thumbnail}
                              alt=""
                            />
                          </div>
                          <div className="p-4">
                            <h2 className="font-bold text-muted capitalize">{item?.category}</h2>
                            <h1 className="font-bold text-xl mt-1">{item?.title}</h1>
                            <div className="mt-2 flex items-center justify-between">
                              <div>
                                <h2 className="flex items-center gap-2 font-bold">
                                  <FaIndianRupeeSign /> {item?.price}
                                </h2>
                                <div className="flex gap-2 mt-2 items-center font-semibold text-muted">
                                  <FaStar className="" style={{ fill: secondaryColor }} />
                                  <span className="font-bold">{item?.rating}</span>
                                  <small>({item?.reviews?.length} reviews)</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {/* slider  */}

        {/* CTA + image overlay  */}

        <div className="my-12 relative md:py-12">
          <div className="absolute inset-0">
            {
              <img
                onError={(e) => (e.target.src = h2)}
                className="object-cover w-full h-full"
                src={imageWithOverlay?.image}
                alt=""
              />
            }
          </div>

          <div
            className="absolute top-0 left-0 w-full h-full z-10"
            style={{
              background:
                selectedColor === "solid"
                  ? `linear-gradient(to right, ${primaryColor + "99"},${primaryColor + "80"},${primaryColor + "b3"
                  })`
                  : `linear-gradient(to right, ${from + "99"},${via + "80"},${to + "b3"})`,
            }}
          ></div>

          <div
            className=" py-4 px-4 flex flex-col gap-2 justify-center text-center uppercase basis-[60%] relative z-[100]"
            style={{ color: innerText }}
          >
            <div className="my-4 flex flex-col gap-2 max-w-[700px] mx-auto">
              <h1 className="text-xl lg:text-2xl  font-bold">{imageWithOverlay?.title}</h1>
              <p className=" text-sm lg:text-xl  font-bold">{imageWithOverlay?.description}</p>
            </div>
            <Link
              className="  py-2 font-bold xs:w-[50%] mx-auto px-4 sm:w-fit"
              to={imageWithOverlay?.ctaLink}
              style={{
                background:
                  selectedColor === "solid"
                    ? primaryColor
                    : `linear-gradient(to right, ${from},${via},${to})`,
                color: innerText,
              }}
            >
              {imageWithOverlay?.cta}
            </Link>
          </div>
        </div>

        {/* counter  */}

        {/* new counter  */}

        <div
          className=" text-inverted my-8 px-8 py-8 lg:py-12 lg:grid grid-cols-5"
          style={{
            background:
              selectedColor === "solid"
                ? primaryColor
                : `linear-gradient(to right, ${from},${via},${to})`,
            color: innerText,
          }}
        >
          <h1 className="font-bold text-2xl lg:col-span-2">{dataSlate?.title}</h1>
          <div className="my-8 lg:my-0 flex lg:col-span-3 gap-6 flex-wrap justify-between">
            {Array.from({ length: 3 }).map((item, index) =>
              dataSlate[`value${index + 1}`] ? (
                <InView triggerOnce={true} threshold={0.5} key={index}>
                  {({ ref, inView }) => (
                    <div
                      ref={ref}
                      className={clsx(
                        "font-bold transition-all duration-500 basis-[40%] sm:basis-[25%] w-fit py-2 relative before:absolute before:h-[2px] before:bg-white before:w-0 before:top-0 before:left-0 before:transition-all before:duration-500",
                        inView && "before:w-1/2"
                      )}
                    >
                      <h1
                        className={clsx(
                          "text-2xl transition-all duration-500 ",
                          inView ? "translate-y-0" : "translate-y-1/2"
                        )}
                      >
                        {isNaN(Number(dataSlate[`value${index + 1}`])) ? (
                          dataSlate[`value${index + 1}`]
                        ) : (
                          <Counter end={Number(dataSlate[`value${index + 1}`])} />
                        )}
                      </h1>
                      <p
                        className={clsx(
                          "uppercase text-sm font-semibold transition-all duration-500 ",
                          inView ? "translate-y-0" : "translate-y-1/2"
                        )}
                      >
                        {dataSlate[`dataName${index + 1}`]}
                      </p>
                    </div>
                  )}
                </InView>
              ) : null
            )}
          </div>
        </div>

        {/* faqs  */}

        <div className="my-12 mx-8 py-8 px-4 rounded-3xl">
          <h1 className="text-base text-center text-xl font-bold mb-4">Frequntly Ask Questions</h1>
          <div className="max-w-[800px] mx-auto">
            {faqs?.map((item, index) => (
              <div
                key={index}
                className={"p-4 rounded-xl cursor-pointer"}
                style={
                  index === activeFaq
                    ? {
                      background:
                        selectedColor === "solid"
                          ? primaryColor
                          : `linear-gradient(to right, ${from},${via},${to})`,
                    }
                    : {}
                }
              >
                <div className="flex" onClick={() => setActiveFaq(index)}>
                  <h2
                    className={`grow text-base`}
                    style={
                      activeFaq === index
                        ? { color: innerText }
                        : { color: uiMode === "snowfall" ? "black" : "white" }
                    }
                  >
                    {item?.question}
                  </h2>
                  {index === activeFaq ? (
                    <FiMinusCircle
                      size={20}
                      style={{ background: innerText, borderRadius: "100%" }}
                    />
                  ) : (
                    <FiPlusCircle size={20} className="text-base" />
                  )}
                </div>
                <Collapse isOpened={index === activeFaq}>
                  <p className="mt-2" style={{ color: innerText }}>
                    {item?.answer}
                  </p>
                </Collapse>
              </div>
            ))}
          </div>
        </div>

        {/* featured section  */}

        <div className="my-12 mx-8 py-8 px-4 rounded-3xl text-base hidden md:block">
          <h1 className=" text-2xl font-semibold">Our some features</h1>
          <div className="flex  justify-center gap-8 mt-12">
            <div className="basis-1/2 flex flex-col gap-4">
              {featuredContent?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setFeaturedActiveSlide(index)}
                  className={`flex gap-8 cursor-pointer border-[1px] p-4 rounded-md overflow-hidden h-fit relative before:absolute before:w-[2%]  before:transition-all before:duration-300 before:h-full  ${index === featuredActiveSlide
                      ? "before:translate-x-0 border-red-500 "
                      : "before:-translate-x-full border-black/40"
                    }`}
                  style={
                    index === featuredActiveSlide
                      ? { borderColor: selectedColor === "solid" ? primaryColor : from }
                      : { borderColor: uiMode === "snowfall" ? "black" : "white" }
                  }
                >
                  <div
                    className={`absolute top-0 left-0 w-[2%] h-full transition-all duration-300  ${index === featuredActiveSlide ? "translate-x-0" : "-translate-x-full "
                      }}`}
                    style={{ background: selectedColor === "solid" ? primaryColor : from }}
                  ></div>
                  <div>
                    <GiCrystalGrowth
                      size={50}
                      style={
                        index === featuredActiveSlide
                          ? { fill: selectedColor === "solid" ? primaryColor : from }
                          : { fill: uiMode === "snowfall" ? "black" : "white" }
                      }
                    />
                  </div>
                  <div className="text-base">
                    <h2 className=" font-semibold text-base">{item.title}</h2>
                    <p>{item.description}</p>
                    <Link
                      className="flex gap-4 items-center"
                      style={{ color: selectedColor === "solid" ? primaryColor : from }}
                      to={"#"}
                    >
                      {" "}
                      {item.cta}
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="basis-1/2 overflow-hidden rounded-lg">
              <img
                onError={(e) =>
                (e.target.src =
                  "https://www.tobyajenkins.com/assets/uploads/Rework-front-cover.png")
                }
                className="w-full h-full object-contain rounded-lg"
                src={featuredContent[featuredActiveSlide]?.image}
                alt=""
              />
            </div>
          </div>
        </div>

        {/* testimonials  */}

        <div className=" rounded-3xl mx-8 py-4 overflow-hidden">
          <h2 className="!text-2xl font-medium text- mb-12  my-4 text-base text-center">
            Here's what our customers have to say
          </h2>
          <div className="slider-container relative mx-4 md:mx-4" id="testimonial-slider">
            {testimonials?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((item, index) => (
                  <div
                    key={index}
                    className={`text-base bg-background rounded-xl p-4 min-h-[150px] !flex justify-center flex-col border-2 border-gray-300 relative`}
                  >
                    <div className="flex items-center gap-1 mb-4 border-b pb-4 border-gray-200">
                      {Array.from({ length: 5 }).map((item, index) => (
                        <FaStar key={index} className="fill-yellow-400" />
                      ))}
                    </div>

                    <div className=" text-gray-500 font-medium">{item.description}</div>
                    <div className="mt-4 font-bold text-lg">
                      <p className="flex gap-2 items-center font-normal text-base">
                        <FaUserCircle className="fill-gray-400" /> {item.user}
                      </p>
                    </div>
                    <BiSolidQuoteAltLeft
                      size={40}
                      className="absolute bottom-[10%] right-[5%] fill-gray-300 rotate-[180deg]"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* blog page  */}
        <BlogComponent innerText={innerText} />

        <Footer innerText={innerText} />
      </div>
    </div>
  );
};

export default ThirdTemplate;
