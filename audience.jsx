import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Checkbox,
  ScrollArea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcn/ui";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import animationData from "../../../../public/animation/audienceImage.json";

import { GoDownload } from "react-icons/go";
// import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import DashNav from "../../components/DashNav";
import SideBar from "../../components/SideBar";
import { CONST } from "../../config";
import { useAxios } from "../../config/axios";
import TableLoader from "../../loaders/TableLoader";

const Audience = () => {
  // const { currentUser } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("lifetime");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemsArray, setSelectedItemsArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const tabs = ["All", "New", "Existing", "Returning"];

  const filters = ["lifetime", "today", "yesterday", "this week", "this month"];

  const axiosInstance = useAxios();
  const [audienceData, setAudienceData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredData = audienceData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(audienceData.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  function filterDataByTimePeriod(data, timePeriod) {
    const now = new Date();

    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);
    const thisWeekStart = new Date(now.getTime() - (now.getDay() - 1) * 24 * 60 * 60 * 1000);
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    switch (timePeriod) {
      case "today":
        return setAudienceData(data.filter((item) => item.timestamp >= todayStart.getTime()));
      case "yesterday":
        return setAudienceData(
          data.filter(
            (item) =>
              item.timestamp >= yesterdayStart.getTime() && item.timestamp < todayStart.getTime()
          )
        );
      case "this week":
        return setAudienceData(data.filter((item) => item.timestamp >= thisWeekStart.getTime()));
      case "this month":
        return setAudienceData(data.filter((item) => item.timestamp >= thisMonthStart.getTime()));
      default:
        setAudienceData(data);
    }
  }

  const handleToggleCheckbox = (value) => {
    const array = [...selectedItemsArray];
    const index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
    } else {
      array.push(value);
    }
    setSelectedItemsArray(array);
  };

  const handleAllItemsSelect = (val) => {
    if (val) {
      setSelectedItemsArray(audienceData?.map((item) => item?.mobile));
    } else {
      setSelectedItemsArray([]);
    }
  };

  const handleDeleteItems = () => {
    setAudienceData(
      audienceData.filter((item, index) => !selectedItemsArray.includes(item?.mobile))
    );
    setSelectedItemsArray([]);
  };

  useEffect(() => {
    filterDataByTimePeriod(audienceData, selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
    const fetchAudience = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(CONST.uri.business.GET_AUDIENCE);
        console.log(res.data);
        setAudienceData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAudience();
  }, []);

  return (
    <div className="overflow-hidden flex">
      <SideBar />
      <div className="grow">
        <DashNav />

        {/* dashboard */}
        <ScrollArea className="w-full h-[calc(100vh-60px)]  rounded-lg bg-white mx-auto">
          {loading ? (
            <TableLoader />
          ) : audienceData?.length > 0 ? (
            <div>
              <h1 className="text-xl font-normal p-2 px-8 border-b border-black">Audience</h1>
              <div className="flex items-center justify-between px-8 py-4 my-2">
                <div className="flex items-center gap-4">
                  {tabs.map((item, index) => (
                    <span
                      onClick={() => {
                        setSelectedTab(item);
                      }}
                      className={`  cursor-pointer text-sm  p-2 px-4 rounded-sm ${
                        selectedTab === item
                          ? "bg-white border-2 border-background"
                          : "bg-background text-gray-800"
                      } `}
                      key={index}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <button className="p-2 px-4 rounded-md text-sm bg-background">
                    Add Customers
                  </button>
                  <Button className="text-white text-sm">Import Customers</Button>
                </div>
              </div>
              <div className="flex items-center justify-between px-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 border border-gray-500 p-2 rounded-md max-w-[300px]">
                    <FaSearch className="font-normal" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="focus:outline-0 w-full"
                      placeholder="search name or mobile..."
                    />
                  </div>
                  {selectedItemsArray.length ? (
                    <div
                      onClick={() => setShowDeleteModal(true)}
                      className="text-red-500 underline cursor-pointer text-sm"
                    >
                      Delete Selected({selectedItemsArray.length})
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 cursor-pointer border p-1 px-4 rounded-md border-gray-400">
                    Export <GoDownload />
                  </span>
                  <Select
                    defaultValue={selectedFilter}
                    onValueChange={(val) => setSelectedFilter(val)}
                  >
                    <SelectTrigger className="bg-white focus:ring-0 border border-gray-400">
                      <SelectValue placeholder="lifetime" className="flex items-center gap-2" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {filters?.map((item, index) => (
                          <SelectItem className="capitalize" value={item} key={index}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* audience table  */}
              <div className="px-4 py-4">
                <div class="overflow-x-scroll w-full max-w-[calc(100vw-250px)]">
                  <table class="table-auto w-full border-collapse border-gray-300 ">
                    <thead className="bg-[#f2f2f2] text-sm ">
                      <tr className="whitespace-nowrap">
                        <div className="sticky left-0">
                          <th class=" bg-gray-100 border-b border-gray-300 px-4 py-2 text-left  font-normal  text-gray-900 ">
                            <Checkbox
                              checked={selectedItemsArray.length === audienceData.length}
                              onCheckedChange={(val) => {
                                handleAllItemsSelect(val);
                              }}
                            />
                          </th>
                          <th class=" bg-gray-100 border-b border-gray-300 px-4 py-2 text-left  font-normal  text-gray-900 ">
                            Customers Name
                          </th>
                        </div>
                        <th class="border-b border-gray-300 px-4 py-2 text-left  font-normal  text-gray-900 ">
                          Mobile Number
                        </th>
                        <th class="border-b border-gray-300 px-4 py-2 text-left  font-normal  text-gray-900 ">
                          Email
                        </th>
                        <th class="border-b border-gray-300 px-4 py-2 text-left  font-normal  text-gray-900 ">
                          Total Orders
                        </th>
                        <th class="border-b border-gray-300 px-4 py-2 text-left  font-normal  text-gray-900 ">
                          Total Sales
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {search !== "" ? (
                        <>
                          {audienceData
                            .filter(
                              (item) =>
                                item.name.toLowerCase().includes(search.toLowerCase()) ||
                                item.email.toLowerCase().includes(search.toLowerCase()) ||
                                item.mobile.toString().startsWith(search)
                            )
                            .map((item, index) => (
                              <tr className="text-sm border-b border-gray-500">
                                <div key={index} className="sticky left-0 bg-white">
                                  <td class="whitespace-nowrap px-4 py-2  text-gray-700">
                                    <Checkbox
                                      onCheckedChange={() => handleToggleCheckbox(item?.mobile)}
                                      checked={selectedItemsArray.includes(item.mobile)}
                                    />
                                  </td>
                                  <td class="whitespace-nowrap px-4 py-2  text-gray-700">
                                    {item?.name}
                                  </td>
                                </div>
                                <td class="whitespace-nowrap px-4 py-2  text-gray-700">
                                  {item.mobile}
                                </td>
                                <td class="whitespace-nowrap px-4 py-2  text-gray-700">
                                  {item.email}
                                </td>
                                <td class="whitespace-nowrap px-4 py-2  text-gray-700">
                                  {item.order}
                                </td>
                                <td class="whitespace-nowrap px-4 py-2  text-gray-700">
                                  {item.sale}
                                </td>
                              </tr>
                            ))}

                          {audienceData.filter(
                            (item) =>
                              item.name.toLowerCase().includes(search.toLowerCase()) ||
                              item.email.toLowerCase().includes(search.toLowerCase()) ||
                              item.mobile.toString().startsWith(search)
                          ).length === 0 && (
                            <tr className="">
                              <td className="pt-8 text-center text-xl" colSpan={6}>
                                No customer found...
                              </td>
                            </tr>
                          )}
                        </>
                      ) : (
                        filteredData.map((item, index) => (
                          <tr className="text-sm border-b border-gray-500">
                            <div key={index} className="sticky left-0 bg-white">
                              <td class="whitespace-nowrap px-4 py-2  text-gray-700">
                                <Checkbox
                                  onCheckedChange={() => handleToggleCheckbox(item?.mobile)}
                                  checked={selectedItemsArray.includes(item?.mobile)}
                                />
                              </td>
                              <td class="whitespace-nowrap px-4 py-2  text-gray-700">
                                {item?.name}
                              </td>
                            </div>
                            <td class="whitespace-nowrap px-4 py-2  text-gray-700">
                              {item.mobile}
                            </td>
                            <td class="whitespace-nowrap px-4 py-2  text-gray-700">{item.email}</td>
                            <td class="whitespace-nowrap px-4 py-2  text-gray-700">{item.order}</td>
                            <td class="whitespace-nowrap px-4 py-2  text-gray-700">{item.sale}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* pagination  */}
              {search === "" && (
                <div className="p-4 flex items-center justify-center gap-3 cursor-pointer">
                  <span
                    onClick={() => {
                      setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
                    }}
                    className={`border border-gray-400 rounded-md p-2 ${
                      currentPage === 1 && "cursor-not-allowed"
                    }`}
                  >
                    <FaAngleLeft size={14} />
                  </span>
                  <span className="text-xl bg-[#5170fe] rounded-md flex items-center justify-center text-white p-2  w-[35px] h-[35px]">
                    {currentPage}
                  </span>
                  <span
                    onClick={() => {
                      setCurrentPage(currentPage !== totalPages ? currentPage + 1 : currentPage);
                    }}
                    className={`border border-gray-400 rounded-md p-2  ${
                      currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <FaAngleRight size={14} />
                  </span>
                </div>
              )}

              {/* delete dialog  */}
              <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-medium">
                      Delete {selectedItemsArray.length} customers?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Do tou want to delete {selectedItemsArray.length} customers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className={"flex items-center "}>
                    <AlertDialogAction
                      className="bg-white text-black shadow-sm shadow-black justify-self-start hover:bg-white"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      cancle
                    </AlertDialogAction>
                    <AlertDialogAction
                      className="bg-red-500 text-white hover:bg-red-400 justify-self-start"
                      onClick={() => handleDeleteItems()}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <NoAudience />
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Audience;

const NoAudience = () => {
  return (
    <div className="h-[calc(100vh-60px)] grid place-items-center bg-white">
      <div className="flex flex-col items-center text-center gap-2">
        <Lottie animationData={animationData} className="w-[150px] h-[150px]" loop={true} />
        <div className="space-y-2 text-center">
          <h1 className="font-semibold text-2xl">No Audience Available</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, laudantium.</p>
        </div>
      </div>
    </div>
  );
};
