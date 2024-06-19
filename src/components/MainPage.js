import React, { useState, useRef, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { FaFileDownload } from "react-icons/fa";
import ReactSlider from "react-slider";
import { MdDraw, MdFlag } from "react-icons/md";
import { GiWheat } from "react-icons/gi";
import { CiWheat } from "react-icons/ci";
import { FaCalendar } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaCoins } from "react-icons/fa";
import { VscPieChart } from "react-icons/vsc";
import { GrAppsRounded } from "react-icons/gr";
import Slider from "@mui/material/Slider";
import { TiChartArea } from "react-icons/ti";
import { FaHistory } from "react-icons/fa";
import Shapefile from "./Shapefile";
import { FaRegFlag } from "react-icons/fa";
import ru from "date-fns/locale/ru";
import { MdLanguage } from "react-icons/md";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  FeatureGroup,
  ZoomControl,
  useMap,
  ImageOverlay,
  Popup,
} from "react-leaflet"; //Marker, Popup,
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/assets/css/leaflet.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.js";
import GeoTiffLayer from "./GeoTiffLayer";
import Legend from "./Legend/Legend";
import MyLegend from "./Legend/Legend";
import L, { DomUtil } from "leaflet";
import ReactDOM, { render } from "react-dom";
import { loadTiff } from "./tiffutils";
import Sucrose from "../data/Sucrose.json";
import Harvest_Date from "../data/Harvest_Date.json";
import Water_Stress from "../data/Water_Stress.json";
import Yield from "../data/Yield.json";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import chroma from "chroma-js";
import styles from "./MainPage.css";
import { area, bbox } from "@turf/turf";
import CustomSearchInput from "./CustomSeachInput.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "leaflet-draw/dist/leaflet.draw.css";
import axios from "axios";
import { fromUrl, fromBlob } from "geotiff";
import Dropdown from "react-bootstrap/Dropdown";
// Remember to import the DatePicker CSS
import "react-datepicker/dist/react-datepicker.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import "@fontsource/red-hat-display"; // In case of npm package
import { ImStack } from "react-icons/im";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import { SiGraphql } from "react-icons/si";
import { BsTextarea, BsPlusCircleFill } from "react-icons/bs";
import { HiOutlineMinus } from "react-icons/hi";
import { BsCircle, BsFillCloudSunFill } from "react-icons/bs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MdUploadFile } from "react-icons/md";
import "./MyCalendar.css";
import { AiOutlineLeft, AiOutlinePlus } from "react-icons/ai";
import DiscreteSliderr from "./DiscreteSlider";
import { FcSettings } from "react-icons/fc";
import { extractShapes } from "./utils";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import ColorBar from "./lgnd";
import {
  Comment,
  ColorRing,
  InfinitySpin,
  RotatingLines,
} from "react-loader-spinner";
import Select from "react-dropdown-select";

const SetViewOnClick = ({ coords, map }) => {
  useEffect(() => {
    if (coords && map) {
      map.setView(coords, 13);
    }
  }, [coords, map]);

  return null;
};

const MainPage = () => {
  const [ETActive, setETActive] = useState(false);
  const [waterProdActive, setwaterProdActive] = useState(false);
  const [bioticStressActive, setbioticStressActive] = useState(false);
  const [harvestActive, setHarvestActive] = useState(false);
  const [sucroseActive, setSucroseActive] = useState(false);
  const [yieldActive, setYieldActive] = useState(false);
  const [waterStressActive, setWaterStressActive] = useState(false);
  const [IWRActive, setIWRActive] = useState(false);
  const [maptype, setMaptype] = useState(false);
  const [russian, setRussian] = useState(false);
  const [selectedParameter, SetselectedParameter] = useState("");
  const [selectedResult, SetselectedResult] = useState("");
  const [selectedCrop, SetselectedCrop] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [etiwrVisible, setEtiwrVisible] = useState(false);
  const [settingTabVisible, setSettingTabVisible] = useState(false);
  const [reportvisible, setReportvisible] = useState(false);
  const [continueclicked, setContinueclicked] = useState(false);
  const [secondcontainervisible, setSecondcontainervisible] = useState(false);
  const [legendString, setlegendString] = useState("");
  const [aoivisible, setAoivisible] = useState(false);
  const [democlicked, Setdemoclicled] = useState(false);
  const [resultListClicked, SetresultListClicked] = useState(false);
  const [latituteDisplay, setLatituteDisplay] = useState();
  const [longitudeDisplay, setLongitudeDisplay] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const mapRef = useRef();
  const [isScriptExecuting, setIsScriptExecuting] = useState(false);
  const [isdatefetching, setisdatefetching] = useState(false);
  let lastAddedPolygonID;
  const [meandata, setmeandata] = useState("");
  const [meandata2, setmeandata2] = useState("");
  const [tempstring, settempstring] = useState("");
  const [tiffUrl, setTiffUrl] = useState(null);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(63);
  const [isOpenPara, setIsOpenPara] = useState(false);
  const [isOpenCrop, setIsOpenCrop] = useState(false);
  const [date, setDate] = useState(new Date());
  const [color, setColor] = useState([
    ["#0000FF", "#00FFFF", "#FFFF00", "#FF0000"],
  ]);
  const [geodata, setgeodata] = useState();
  const [mainSliderValue, setMainSliderValue] = useState(0);
  const [geojsonData, setGeojsonData] = useState(null);
  const center = [28.7334, 77.2986];
  const zoom = 13;
  const [intialtiff, setinitialtiff] = useState(true);
  const [allDates, setAllDates] = useState({});
  const [tiffbackend, setTiffbackend] = useState(null);
  const [tiffBlob, setTiffBlob] = useState(null);
  const [geojson, setGeojson] = useState(null);
  const [areaOfPolygon, setAreaOfPolygon] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDateString, setStartDateString] = useState(
    date.toISOString().substring(0, 10)
  );
  const [endDateString, setEndDateString] = useState(
    date.toISOString().substring(0, 10)
  );
  const [jsonJoin, SetjsonJoin] = useState(null);
  const [legendVisible, setLegendVisible] = useState(false);
  const [selected, setselected] = useState(false);
  const [geodata2, setgeodata2] = useState();
  const [selectedParameter2, SetselectedParameter2] = useState("");
  const [checkedIndex, setCheckedIndex] = useState(null);
  const [AllData, setAllData] = useState([]);
  console.log("in main");

  const cropTranslations = {
    Sugarcane: {
      en: "Sugarcane",
      ru: "Картошка",
    },
    Chilli: {
      en: "Chilli",
      ru: "Картошка",
    },
    Palm: {
      en: "Palm",
      ru: "Картошка",
    },
    Potato: {
      en: "Potato",
      ru: "Картошка",
    },
    Corn: {
      en: "Corn",
      ru: "Кукуруза",
    },
    Cotton: {
      en: "Cotton",
      ru: "Хлопок",
    },
    Wheat: {
      en: "Wheat",
      ru: "Пшеница",
    },
    Barley: {
      en: "Barley",
      ru: "Ячмень",
    },
    Alfalfa: {
      en: "Alfalfa",
      ru: "Люцерна",
    },
    Sunflower: {
      en: "Sunflower",
      ru: "Подсолнечник",
    },
    "Date Palm": {
      en: "Date Palm",
      ru: "Подсолнечник",
    },
  };

  const Paratranslations = {
    "Crop Yield": {
      en: "Crop Yield",
      ru: "Урожайность",
    },
    Evapotranspiration: {
      en: "Evapotranspiration",
      ru: "Эвапотранспирация",
    },
    IWR: {
      en: "IWR",
      ru: "Водораздел",
    },
    "Water Productivity": {
      en: "Water Productivity",
      ru: "Производительность воды",
    },
    "Biotic Stress": {
      en: "Biotic Stress",
      ru: "Производительность воды",
    },
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    return `${year}-${day}-${month}`;
  };

  const formatDateReport = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Note: Months are zero-based
    const day = date.getDate();

    return `${year}-${day}-${month}`;
  };

  const handleTickClick = async (
    selectedtiff,
    selectedjson,
    selectedPara,
    index,
    selectedmean,
    selectedId
  ) => {
    setmeandata2(selectedmean);
    setCheckedIndex(index);
    setReportvisible(true);
    setLegendVisible(true);
    // console.log(index);

    SetselectedParameter2(selectedPara);
    setgeodata(selectedjson);
    setgeodata2(selectedjson);
    setselected(true);
    // const byteCharacters = atob(selectedtiff);
    // const byteNumbers = new Array(byteCharacters.length);
    // for (let i = 0; i < byteCharacters.length; i++) {
    //   byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    // const byteArray = new Uint8Array(byteNumbers);
    // const blob = new Blob([byteArray], { type: "image/tiff" });
    // const url = URL.createObjectURL(blob);
    // const tiff = await fromBlob(blob);
    // const image = await tiff.getImage();
    // const rasterData = await image.readRasters();
    // const minValue = Math.min(...rasterData[0]);
    // const maxValue = Math.max(...rasterData[0]);
    // setMinValue(minValue);
    // setMaxValue(maxValue);
    if (
      selectedParameter === "IWR" ||
      selectedParameter === "Water Productivity"
    ) {
      setColor(["#FF0000", "#FFFF00", "#00FFFF", "#0000FF"]);
    } else {
      setColor(["#0000FF", "#00FFFF", "#FFFF00", "#FF0000"]);
    }

    // console.log(url);
    // handleDownload();
    // setTiffUrl(url);
    fetchGeoTiff(selectedtiff);
  };

  // Assuming AllData is an array or an object with a 'data' property
  const filteredData =
    AllData && AllData.data && AllData.data.length > 0
      ? AllData.data.filter(
          (item) =>
            item.selectedCrop === selectedCrop &&
            item.selectedPara === selectedParameter
        )
      : [];

  const options = {
    pixelValuesToColorFn: (values) => {
      if (!intialtiff === true) {
        return "rgba(0,0,0,0)";
      } else {
        const nir = values[0];
        const colorScale = chroma.scale(color).domain([minValue, maxValue]);

        if (nir === 0) {
          return "rgba(0,0,0,0)";
        }
        return colorScale(nir).css();
      }
    },
    resolution: 1024,
    opacity: 1,
  };

  const dropdownButtonPara = () => {
    setReportvisible(false);
    setTiffUrl(null);
    setLegendVisible(false);
    setgeodata(null);
    setgeodata2(null);
    setmeandata(null);
    setmeandata2(null);
    setIsOpenPara(!isOpenPara);
    setCheckedIndex(null);
  };

  const dropdownButtonCrop = () => {
    setReportvisible(false);
    setTiffUrl(null);
    setLegendVisible(false);
    setgeodata(null);
    setgeodata2(null);
    setmeandata(null);
    setmeandata2(null);
    setIsOpenCrop(!isOpenCrop);
    setTiffUrl(null);
    setCheckedIndex(null);
    setgeodata(null);
    setgeodata2(null);
  };

  const handleDateChange = (date) => {
    const selectedDateUTC = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    setSelectedDate(selectedDateUTC);
    // console.log("actual date :", selectedDateUTC);
    senddatefortiff(selectedDateUTC);
  };

  const fetchmean = async () => {
    try {
      setgeodata(null);
      setmeandata(null);
      setmeandata2(null);
      const response = await fetch("https://riyadhhazel.duckdns.org/api/data");
      const { data, geo_data } = await response.json();
      // console.log(data);
      // console.log(geo_data);
      setgeodata(geo_data);
      // console.log(geodata);
      const dataAsString = JSON.stringify(data);
      setmeandata2(dataAsString);
      setmeandata(dataAsString);
      return { mean: dataAsString, geo: geo_data };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const dateIsHighlighted =
    (MainSliderValue) =>
    ({ date }) => {
      const localDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        12
      );
      const dateString = localDate.toISOString().split("T")[0];
      const dateValue = allDates[dateString];

      const highlight = dateValue !== undefined && dateValue <= MainSliderValue;
      // Highlight the date only if it's present in allDates and its value is less than or equal to MainSliderValue

      return highlight ? "highlighted-date" : null;
    };

  async function fetchGeoTiff(selectedtiff) {
    if (tempstring === "sc" || tempstring === "hd") return;
    // console.log("Running fetchGeoTiff");
    let base64Data;
    if (!selectedtiff) {
      const response = await fetch("https://riyadhhazel.duckdns.org/geotiff");
      const data = await response.json();
      console.log(data);
      base64Data = data.file;
      console.log("base64Data", base64Data);
      setTiffbackend(data);
    } else {
      base64Data = selectedtiff;
    }

    // console.log(data);

    // console.log(base64Data, "base64");
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/tiff" });
    setTiffBlob(blob);
    const url = URL.createObjectURL(blob);
    const tiff = await fromBlob(blob);
    const image = await tiff.getImage();
    const rasterData = await image.readRasters();
    // const minValue = 0;
    // const maxValue = Math.max(...rasterData[0]);
    setMinValue(0);
    setMaxValue(63);
    setTiffUrl(url);
    setReportvisible(true);
    setLegendVisible(true);
    return blob;
  }

  async function executeScript(str) {
    // console.log("Executing script...");
    setIsScriptExecuting(true); // Set isScriptExecuting to true before making the request

    try {
      // console.log("inside try");
      await fetch("https://riyadhhazel.duckdns.org/execute-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: str }),
      });
      // setinitialtiff(false);
      if (
        selectedParameter === "IWR" ||
        selectedParameter === "Water Productivity"
      ) {
        setColor(["#FF0000", "#FFFF00", "#00FFFF", "#0000FF"]);
      } else {
        setColor(["#0000FF", "#00FFFF", "#FFFF00", "#FF0000"]);
      }
      const blob = await fetchGeoTiff();
      const { mean, geo } = await fetchmean();
      setIsScriptExecuting(false);
      setReportvisible(true);
      // await SendAllData(mean, blob, geo).then(
      //   () => GetAllData(),
      //   setIsScriptExecuting(false),
      //   setReportvisible(true)
      // );
    } catch (error) {
      console.error("Error executing script:", error);
    } finally {
    }

    // console.log("Executing script end...");
  }

  function downloadObjectAsJson(exportObj, exportName) {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  const downloadJson = () => {
    // console.log(geodata);
    downloadObjectAsJson(geodata, "GeojsonData");
  };

  const handleDownload = () => {
    if (tiffUrl) {
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = tiffUrl;
      link.download = "new.tiff";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const filter2023Dates = (date) => {
    return date.getFullYear() === 2023;
  };

  const handleStartDateChange = (date) => {
    // console.log(date);
    setStartDate(date);
    setStartDateString(date.toISOString().substring(0, 10));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setEndDateString(date.toISOString().substring(0, 10));
  };

  const onDrawCreate = (e) => {
    const layer = e.layer;
    console.log(e.layer);

    if (
      e.layerType === "polygon" ||
      e.layerType === "rectangle" ||
      e.layerType === "circlemarker" ||
      e.layerType === "polyline" ||
      e.layerType === "circle" ||
      e.layerType === "marker"
    ) {
      // Remove the previous polygon/rectangle from the map
      if (lastAddedPolygonID) {
        e.sourceTarget._layers[lastAddedPolygonID].remove();
      }
      // Update the lastAddedPolygonID with the new layer's ID
      lastAddedPolygonID = layer._leaflet_id;
    }

    const geojson = layer.toGeoJSON();
    console.log(geojson);
    setGeojson(geojson);
    const polygonArea = area(geojson) / 1000000;
    const round = polygonArea.toFixed(2);
    console.log(geojson);
    setAreaOfPolygon(round);
    setGeojson(geojson);
    setGeojsonData(geojson);
    // sendGeoJSONToServer(geojson);
  };

  // boundingBox: [
  //   { lng: 72.9509658813477699, lat: 19.1215515136719318 },
  //   { lng: 73.8060531616212074, lat: 19.7221698760986328 },
  // ],

  const handleFileUpload = async (event) => {
    // console.log(e.target.files);
    // var reader = new FileReader();
    // reader.onload = function () {
    //   var arrayBuffer = this.result,
    //     array = new Uint8Array(arrayBuffer),
    //     binaryString = String.fromCharCode.apply(null, array);

    //   console.log(binaryString);
    // };
    // reader.readAsArrayBuffer(e.target.files[0]);

    // const temp2 = await extractShapes(e.target.files);

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;
      // console.log(fileContent);
      const jsonData = JSON.parse(fileContent);
      // console.log(jsonData);
      setGeojsonData(jsonData);
      // console.log(jsonData);
      const bboxarray = bbox(jsonData);
      SetjsonJoin(bboxarray.join(":"));

      // console.log(bboxarray.join(":"));
      // console.log(bboxarray);
      let longitude = (bboxarray[0] + bboxarray[2]) / 2,
        latitude = (bboxarray[1] + bboxarray[3]) / 2;
      setCoords([latitude, longitude]);
      const polygonArea = area(jsonData) / 1000000;
      const round = polygonArea.toFixed(2);
      // console.log(geojson);
      setAreaOfPolygon(round);
      //sendGeoJSONToServer(geojsonData);
    };

    reader.readAsText(file);
  };

  const fetchDateAndProcess = async (
    startDate,
    endDate,
    selectedParameter,
    selectedCrop,
    geojsonData
  ) => {
    setisdatefetching(true);
    try {
      const response = await fetch(
        "https://riyadhhazel.duckdns.org/date_process_and_fetch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate,
            endDate,
            selectedParameter,
            selectedCrop,
            geojsonData,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAllDates(data);
        // console.log(data, "402"); // log the fetched dates
      } else {
        console.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setisdatefetching(false);
    }
  };

  const senddatefortiff = async (date) => {
    try {
      const response = await fetch(
        "https://riyadhhazel.duckdns.org/senddatefortiff",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: date,
            crop: selectedCrop,
            input_string: selectedParameter,
          }),
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        // console.log("Received date from server:", jsonResponse);
      } else {
        console.error(`Failed to send date to server: ${response.status}`);
      }
    } catch (error) {
      console.error("Error sending date to server:", error);
    }
  };

  const PopupContent = ({ properties }) => {
    return (
      <div>
        <div>
          {selectedParameter === "Crop Yield" && (
            <div style={{ fontFamily: "Red Hat Display" }}>
              <strong>Crop Yield : </strong>{" "}
              {parseFloat(properties.Crop_Yield).toFixed(2)} ton/ha
            </div>
          )}

          {selectedParameter === "Water Productivity" && (
            <div style={{ fontFamily: "Red Hat Display" }}>
              <strong>Water Productivity: </strong>{" "}
              {parseFloat(properties.WP).toFixed(2)} kg/m3
            </div>
          )}

          {selectedParameter === "IWR" && (
            <div style={{ fontFamily: "Red Hat Display" }}>
              <strong>IWR: </strong> {parseFloat(properties.IWR).toFixed(2)} mm
            </div>
          )}

          {selectedParameter === "Evapotranspiration" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
              }}
            >
              <div style={{ fontFamily: "Red Hat Display" }}>
                <strong>Evapotranspiration : </strong>{" "}
                {parseFloat(properties.ET).toFixed(2)} mm
              </div>

              <div style={{ fontFamily: "Red Hat Display" }}>
                <strong>Water Consumed : </strong>{" "}
                {parseFloat(properties.TWC).toFixed(2)} m
                <sup
                  style={{
                    verticalAlign: "super",
                    fontSize: "small",
                  }}
                >
                  3
                </sup>
                /day
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function valuetext(value) {
    return monthLabels[value - 1];
  }
  const onRoadMouseOver = (x, layer) => {
    // console.log(x);

    const popupContent = ReactDOMServer.renderToString(
      <PopupContent properties={x.properties} />
    );

    layer.bindPopup(popupContent).openPopup();
  };

  const onRoadMouseOut = (layer) => {
    layer.closePopup();
  };

  const onEachRoad = (x, layer) => {
    layer.on({
      mouseover: () => onRoadMouseOver(x, layer),
      mouseout: () => onRoadMouseOut(layer),
    });
  };

  const PopupContent2 = ({ properties }) => {
    return (
      <div>
        <div>
          {selectedParameter2 === "Crop Yield" && (
            <div style={{ fontFamily: "Red Hat Display" }}>
              <strong>Crop Yield</strong>{" "}
              {parseFloat(properties.Crop_Yield).toFixed(2)} ton/ha
            </div>
          )}

          {selectedParameter2 === "Water Productivity" && (
            <div style={{ fontFamily: "Red Hat Display" }}>
              <strong>Water Productivity : </strong>{" "}
              {parseFloat(properties.WP).toFixed(2)} kg/m3
            </div>
          )}

          {selectedParameter2 === "IWR" && (
            <div style={{ fontFamily: "Red Hat Display" }}>
              <strong>IWR : </strong> {parseFloat(properties.IWR).toFixed(2)} mm
            </div>
          )}

          {selectedParameter2 === "Evapotranspiration" && (
            <div style={{ fontFamily: "Red Hat Display" }}>
              <strong>Evapotranspiration: </strong>{" "}
              {parseFloat(properties.ET).toFixed(2)} mm
            </div>
          )}
        </div>
      </div>
    );
  };

  const onRoadMouseOver2 = (x, layer) => {
    // console.log(x);
    const popupContent = ReactDOMServer.renderToString(
      <PopupContent2 properties={x.properties} />
    );

    layer.bindPopup(popupContent).openPopup();
  };

  const onRoadMouseOut2 = (layer) => {
    layer.closePopup();
  };

  const onEachRoad2 = (x, layer) => {
    layer.on({
      mouseover: () => onRoadMouseOver2(x, layer),
      mouseout: () => onRoadMouseOut2(layer),
    });
  };

  const BlocksIcon = () => {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.9417 10.5667L15.4917 8.58334C15.4 8.53334 15.3083 8.50001 15.2083 8.46667V3.83334C15.2083 3.10001 14.8 2.41667 14.15 2.04167L11.1083 0.291675C10.425 -0.0999919 9.58333 -0.0999919 8.9 0.291675L5.85 2.04167C5.2 2.41667 4.79167 3.10001 4.79167 3.83334V8.47501C4.69167 8.50834 4.6 8.54167 4.50833 8.59167L1.05833 10.5667C0.408333 10.9417 0 11.625 0 12.3583V16.1667C0 16.9 0.408333 17.5833 1.05833 17.9583L4.10833 19.7083C4.45 19.9 4.83333 20 5.21667 20C5.6 20 5.98333 19.9 6.325 19.7083L10.0083 17.5917L13.6917 19.7083C14.0333 19.9 14.4167 20 14.8 20C15.1833 20 15.5667 19.9 15.9083 19.7083L18.9583 17.9583C19.6083 17.5833 20.0167 16.9 20.0167 16.1667V12.3583C20.0167 11.625 19.6083 10.9417 18.9583 10.5667H18.9417ZM18.525 11.2917C18.5917 11.3333 18.65 11.3833 18.7083 11.4333L14.7833 13.6833L10.825 11.4167L14.4917 9.30834C14.6667 9.20834 14.8833 9.20834 15.0667 9.30834L18.5167 11.2917H18.525ZM5.65 3.62501L9.58333 5.88334V10.7L5.90833 8.59167C5.81667 8.54167 5.725 8.50834 5.625 8.47501V3.83334C5.625 3.76667 5.64167 3.69167 5.65 3.62501ZM14.3417 3.62501C14.3583 3.69167 14.3667 3.75834 14.3667 3.83334V8.47501C14.2667 8.50834 14.175 8.54167 14.0833 8.59167L10.4083 10.7V5.88334L14.3417 3.62501ZM9.30833 1.01667C9.73333 0.775008 10.2583 0.775008 10.6833 1.01667L13.7333 2.76667C13.8 2.80834 13.8583 2.85834 13.9167 2.90834L9.99167 5.15834L6.075 2.90834C6.13333 2.85834 6.19167 2.80834 6.25833 2.76667L9.30833 1.01667ZM4.925 9.30834C5.01667 9.25834 5.10833 9.23334 5.20833 9.23334C5.30833 9.23334 5.40833 9.25834 5.49167 9.30834L9.15833 11.4167L5.2 13.6833L1.28333 11.4333C1.34167 11.3833 1.4 11.3333 1.46667 11.2917L4.91667 9.30834H4.925ZM1.46667 17.2333C1.075 17.0083 0.833333 16.6 0.833333 16.1667V12.3583C0.833333 12.2917 0.85 12.2167 0.858333 12.15L4.79167 14.4083V19.1C4.7 19.0667 4.60833 19.0417 4.51667 18.9917L1.46667 17.2417V17.2333ZM5.89167 18.9833C5.80833 19.0333 5.70833 19.0667 5.61667 19.0917V14.4L9.575 12.125V16.8583L5.89167 18.975V18.9833ZM10.4083 16.8667V12.1333L14.3667 14.4083V19.1C14.275 19.0667 14.1833 19.0417 14.0917 18.9917L10.4083 16.875V16.8667ZM19.1583 16.1667C19.1583 16.6 18.9167 17.0083 18.525 17.2333L15.475 18.9833C15.3917 19.0333 15.2917 19.0667 15.2 19.0917V14.4L19.1333 12.1417C19.15 12.2083 19.1583 12.275 19.1583 12.35V16.1583V16.1667Z"
          fill="white"
        />
      </svg>
    );
  };

  const HorizontalLineIcon = () => {
    return (
      <svg
        width="21"
        height="4"
        strokeWidth="1.5"
        viewBox="0 -1 21 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.4372 0.333344H1.10384C0.643604 0.333344 0.270508 0.70644 0.270508 1.16668C0.270508 1.62691 0.643604 2.00001 1.10384 2.00001H19.4372C19.8974 2.00001 20.2705 1.62691 20.2705 1.16668C20.2705 0.70644 19.8974 0.333344 19.4372 0.333344Z"
          fill="white"
        />
      </svg>
    );
  };

  const DividerLineHorizontalIcon = () => {
    return (
      <svg
        width="290"
        height="2"
        viewBox="0 0 336 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0.987061L336 0.987031"
          stroke="white"
          strokeOpacity="0.1"
          strokeWidth="0.4"
        />
      </svg>
    );
  };

  const DownloadIcon = () => {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 8H12C11.2647 8 10.6667 8.598 10.6667 9.33333C10.6667 10.0687 10.0687 10.6667 9.33333 10.6667H6.66667C5.93133 10.6667 5.33333 10.0687 5.33333 9.33333C5.33333 8.598 4.73533 8 4 8H2C0.897333 8 0 8.89733 0 10V12.6667C0 14.5047 1.49533 16 3.33333 16H12.6667C14.5047 16 16 14.5047 16 12.6667V10C16 8.89733 15.1027 8 14 8ZM14.6667 12.6667C14.6667 13.7693 13.7693 14.6667 12.6667 14.6667H3.33333C2.23067 14.6667 1.33333 13.7693 1.33333 12.6667V10C1.33333 9.632 1.632 9.33333 2 9.33333L4 9.332V9.33333C4 10.804 5.196 12 6.66667 12H9.33333C10.804 12 12 10.804 12 9.33333H14C14.368 9.33333 14.6667 9.632 14.6667 10V12.6667ZM4.862 4.74733C4.60133 4.48667 4.60133 4.06533 4.862 3.80467C5.12267 3.544 5.544 3.544 5.80467 3.80467L7.33333 5.33333V0.666667C7.33333 0.298 7.63133 0 8 0C8.36867 0 8.66667 0.298 8.66667 0.666667V5.33333L10.1953 3.80467C10.456 3.544 10.8773 3.544 11.138 3.80467C11.3987 4.06533 11.3987 4.48667 11.138 4.74733L8.94267 6.94267C8.68467 7.20067 8.34533 7.33067 8.006 7.332L8 7.33333L7.994 7.332C7.65467 7.33067 7.31533 7.20067 7.05733 6.94267L4.862 4.74733Z"
          fill="#F5F5F5"
        />
      </svg>
    );
  };

  const DropDownIcon = () => {
    return (
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 2L6 6L11 2"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };

  const SearchIcon = () => {
    return (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.8534 11.1465L8.86889 8.162C9.6822 7.1673 10.0821 5.89804 9.98581 4.61678C9.88955 3.33551 9.3045 2.14026 8.35168 1.27826C7.39887 0.416253 6.15119 -0.0465561 4.86671 -0.0144402C3.58224 0.0176757 2.35924 0.542259 1.4507 1.4508C0.542153 2.35935 0.0175689 3.58234 -0.014547 4.86682C-0.0466629 6.15129 0.416146 7.39898 1.27815 8.35179C2.14016 9.3046 3.33541 9.88965 4.61667 9.98592C5.89794 10.0822 7.16719 9.68231 8.16189 8.869L11.1464 11.8535C11.2407 11.9446 11.367 11.995 11.4981 11.9938C11.6292 11.9927 11.7546 11.9401 11.8473 11.8474C11.94 11.7547 11.9926 11.6293 11.9937 11.4982C11.9949 11.3671 11.9445 11.2408 11.8534 11.1465ZM4.99989 9C4.20877 9 3.43541 8.7654 2.77761 8.32588C2.11981 7.88635 1.60712 7.26164 1.30437 6.53073C1.00162 5.79983 0.922409 4.99556 1.07675 4.21964C1.23109 3.44371 1.61205 2.73098 2.17146 2.17157C2.73087 1.61216 3.44361 1.2312 4.21953 1.07686C4.99545 0.922516 5.79972 1.00173 6.53062 1.30448C7.26153 1.60723 7.88624 2.11992 8.32577 2.77772C8.7653 3.43551 8.99989 4.20887 8.99989 5C8.9987 6.0605 8.57689 7.07722 7.827 7.82711C7.07712 8.577 6.06039 8.99881 4.99989 9Z"
          fill="#4CB963"
        />
      </svg>
    );
  };

  const searchLocation = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${location}&limit=1`
    );

    const data = await response.json();
    if (data[0]) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setCoords([lat, lon]);
    } else {
      alert("Location not found");
    }
    // console.log({ location, data });
  };

  const onStartDraw = (e) => {
    setIsDrawing(true);
  };

  function MyComponent() {
    const map = useMap();
    useEffect(() => {
      if (!isDrawing) {
        const handleMouseMove = (e) => {
          setLatituteDisplay(e.latlng.lat.toFixed(5));
          setLongitudeDisplay(e.latlng.lng.toFixed(5));
        };

        map.on("mousemove", handleMouseMove);
        return () => {
          map.off("mousemove", handleMouseMove);
        };
      }
    }, [map, isDrawing]);

    return null;
  }

  const demobutton = () => {
    setselected(false);
    SetresultListClicked(false);
    // fetchmean();
    Setdemoclicled(!democlicked);
    // console.log(geojsonData);
    setSecondcontainervisible(false);
    setAoivisible(!aoivisible);
    if (reportvisible) {
      setReportvisible(false);
    }
    if (legendVisible) {
      setLegendVisible(false);
    }
    setTiffUrl(null);
    SetselectedCrop("");
    // console.log(tiffUrl);
    SetselectedParameter("");
    setIsOpenPara(false);
    if (ETActive) {
      setETActive(!ETActive);
    }
    if (sucroseActive) {
      setSucroseActive(!sucroseActive);
    }
    if (harvestActive) {
      setHarvestActive(!harvestActive);
    }
    if (yieldActive) {
      setYieldActive(!yieldActive);
    }
    if (IWRActive) {
      setIWRActive(!IWRActive);
    }
    if (waterProdActive) {
      setwaterProdActive(!waterProdActive);
    }
    if (bioticStressActive) {
      setbioticStressActive(!bioticStressActive);
    }
  };

  const resultListButton = () => {
    setGeojsonData(null);
    SetresultListClicked(!resultListClicked);
    setTiffUrl(null);
    setmeandata(null);
    setmeandata2(null);
    setgeodata(null);
    SetselectedCrop("");
    SetselectedParameter("");
    setgeodata2(null);
    if (democlicked) Setdemoclicled(false);
    // console.log(geojsonData);
    setSecondcontainervisible(false);
    if (aoivisible) setAoivisible(!aoivisible);
    if (reportvisible) {
      setReportvisible(false);
    }
    if (legendVisible) {
      setLegendVisible(false);
    }
    if (ETActive) {
      setETActive(!ETActive);
    }
    if (sucroseActive) {
      setSucroseActive(!sucroseActive);
    }
    if (harvestActive) {
      setHarvestActive(!harvestActive);
    }
    if (yieldActive) {
      setYieldActive(!yieldActive);
    }
    if (IWRActive) {
      setIWRActive(!IWRActive);
    }
    if (waterProdActive) {
      setwaterProdActive(!waterProdActive);
    }
    if (bioticStressActive) {
      setbioticStressActive(!bioticStressActive);
    }
  };

  const continueButton = () => {
    // console.log("before fetch list", {allDates.length})
    // console.log(selectedCrop);
    // console.log(geojsonData);
    Setdemoclicled(false);
    fetchDateAndProcess(
      startDate,
      endDate,
      selectedParameter,
      selectedCrop,
      geojsonData
    );
    setContinueclicked(!continueclicked);
    setAoivisible(!aoivisible);
    // setSecondcontainervisible(true);
    // console.log({ location });
    // console.log({ tempstring });
  };

  const gobackbutton = () => {
    setAoivisible(!aoivisible);
    setSecondcontainervisible(false);

    // setHighlightedDates([]);
    setAllDates({});
  };

  const generatebutton = () => {
    setSecondcontainervisible(false);
    // setData(null)
    // setMinValue(null)
    // setMaxValue(null)
    // setLegendVisible(false)
    // setTiffUrl(null)
    // console.log({ tempstring }, "generaTE WAS clicked");
    executeScript(tempstring);
    setAoivisible(aoivisible);
  };

  const toggleEtiwrVisible = () => {
    setEtiwrVisible(!etiwrVisible);
  };

  const onCickHarvestDate = () => {
    settempstring("hd");
    setHarvestActive(!harvestActive);
    if (yieldActive) {
      setYieldActive(!yieldActive);
    }
    if (waterStressActive) {
      setWaterStressActive(!waterStressActive);
    }
    if (IWRActive) {
      setIWRActive(!IWRActive);
    }
    if (ETActive) {
      setETActive(!ETActive);
    }
    if (sucroseActive) {
      setSucroseActive(!sucroseActive);
    }
    if (waterProdActive) {
      setwaterProdActive(!waterProdActive);
    }
    if (bioticStressActive) {
      setbioticStressActive(!bioticStressActive);
    }
    SetselectedParameter("Harvest Date");
    dropdownButtonPara();
  };

  const onClickSucrose = () => {
    settempstring("sc");
    setSucroseActive(!sucroseActive);
    if (IWRActive) {
      setIWRActive(!IWRActive);
    }
    if (ETActive) {
      setETActive(!ETActive);
    }
    if (yieldActive) {
      setYieldActive(!yieldActive);
    }
    if (waterStressActive) {
      setWaterStressActive(!waterStressActive);
    }
    if (harvestActive) {
      setHarvestActive(!harvestActive);
    }
    if (waterProdActive) {
      setwaterProdActive(!waterProdActive);
    }
    if (bioticStressActive) {
      setbioticStressActive(!bioticStressActive);
    }
    SetselectedParameter("Sucrose");
    dropdownButtonPara();
    // setisOpenPara(!isOpenPara);
  };

  const onClickYield = () => {
    settempstring("cy");
    setlegendString("CY");
    setYieldActive(!yieldActive);
    if (sucroseActive) {
      setSucroseActive(!sucroseActive);
    }
    if (IWRActive) {
      setIWRActive(!IWRActive);
    }
    if (ETActive) {
      setETActive(!ETActive);
    }
    if (waterStressActive) {
      setWaterStressActive(!waterStressActive);
    }
    if (harvestActive) {
      setHarvestActive(!harvestActive);
    }
    if (waterProdActive) {
      setwaterProdActive(!waterProdActive);
    }
    if (bioticStressActive) {
      setbioticStressActive(!bioticStressActive);
    }
    SetselectedParameter("Crop Yield");
    dropdownButtonPara();
  };

  const toggleMaptype = () => {
    setMaptype(!maptype);
  };

  const toggleRussian = () => {
    setRussian(!russian);
  };

  const onClickSugarCane = () => {
    SetselectedCrop("Sugarcane");
    dropdownButtonCrop();
  };

  const onCLickChilli = () => {
    SetselectedCrop("Chilli");
    dropdownButtonCrop();
  };

  const onClickPotato = () => {
    SetselectedCrop("Potato");
    dropdownButtonCrop();
  };

  const onClickPalm = () => {
    SetselectedCrop("Palm");
    dropdownButtonCrop();
  };

  const onClickDatePalm = () => {
    SetselectedCrop("Date Palm");
    dropdownButtonCrop();
  };

  const onClickSunflower = () => {
    SetselectedCrop("Sunflower");
    dropdownButtonCrop();
  };

  const onClickBarley = () => {
    SetselectedCrop("Barley");
    dropdownButtonCrop();
  };

  const onClickAlfalfa = () => {
    SetselectedCrop("Alfalfa");
    dropdownButtonCrop();
  };

  const onClickCotton = () => {
    SetselectedCrop("Cotton");
    dropdownButtonCrop();
  };

  const onClickCorn = () => {
    SetselectedCrop("Corn");
    dropdownButtonCrop();
  };

  const onClickWheat = () => {
    SetselectedCrop("Wheat");
    dropdownButtonCrop();
  };

  const onClickET = () => {
    setlegendString("ET");
    settempstring("et");
    setETActive(!ETActive);
    if (IWRActive) {
      setIWRActive(!IWRActive);
    }
    if (sucroseActive) {
      setSucroseActive(!sucroseActive);
    }
    if (harvestActive) {
      setHarvestActive(!harvestActive);
    }
    if (yieldActive) {
      setYieldActive(!yieldActive);
    }
    if (waterProdActive) {
      setwaterProdActive(!waterProdActive);
    }
    if (bioticStressActive) {
      setbioticStressActive(!bioticStressActive);
    }
    SetselectedParameter("Evapotranspiration");
    dropdownButtonPara();
  };

  const onClickIWR = () => {
    setlegendString("IWR");
    settempstring("iwr");
    setIWRActive(!IWRActive);
    if (ETActive) {
      setETActive(!ETActive);
    }
    if (sucroseActive) {
      setSucroseActive(!sucroseActive);
    }
    if (harvestActive) {
      setHarvestActive(!harvestActive);
    }
    if (yieldActive) {
      setYieldActive(!yieldActive);
    }
    if (waterProdActive) {
      setwaterProdActive(!waterProdActive);
    }
    if (bioticStressActive) {
      setbioticStressActive(!bioticStressActive);
    }
    SetselectedParameter("IWR");
    dropdownButtonPara();
  };

  const onClickWaterProd = () => {
    setlegendString("wp");
    settempstring("wp");
    setwaterProdActive(!waterProdActive);
    if (bioticStressActive) {
      setbioticStressActive(!bioticStressActive);
    }
    if (IWRActive) {
      setIWRActive(!IWRActive);
    }
    if (ETActive) {
      setETActive(!ETActive);
    }
    if (sucroseActive) {
      setSucroseActive(!sucroseActive);
    }
    if (harvestActive) {
      setHarvestActive(!harvestActive);
    }
    if (yieldActive) {
      setYieldActive(!yieldActive);
    }
    SetselectedParameter("Water Productivity");
    dropdownButtonPara();
  };

  const onClickBiotic = () => {
    setlegendString("bs");
    settempstring("bs");
    setbioticStressActive(!bioticStressActive);
    if (waterProdActive) {
      setwaterProdActive(!waterProdActive);
    }
    if (IWRActive) {
      setIWRActive(!IWRActive);
    }
    if (ETActive) {
      setETActive(!ETActive);
    }
    if (sucroseActive) {
      setSucroseActive(!sucroseActive);
    }
    if (harvestActive) {
      setHarvestActive(!harvestActive);
    }
    if (yieldActive) {
      setYieldActive(!yieldActive);
    }
    SetselectedParameter("Biotic Stress");
    dropdownButtonPara();
  };

  const blobToBase64 = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const SendAllData = async (meanData, blobData, geo) => {
    try {
      // const formData = new FormData();
      // formData.append("geodata", JSON.stringify(geo));
      // formData.append("selectedDate", selectedDate);
      // formData.append("file", blobData, "file.tiff");

      const response = await fetch(
        "https://riyadhhazel.duckdns.org/SendAllData",
        {
          method: "POST",
          body: JSON.stringify({
            geodata: geo,
            selectedDate,
            selectedParameter,
            selectedCrop,
            file:
              blobData instanceof Blob ? await blobToBase64(blobData) : null,
            meandata: meanData,
            jsonJoin,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
      } else {
        console.error(`Error sending data: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error sending data", error);
    }
  };

  const GetAllData = async () => {
    const response = await fetch("https://riyadhhazel.duckdns.org/GetAllData", {
      method: "POST",
      // body: JSON.stringify({
      //   // geodata,
      //   // selectedDate,
      //   // selectedParameter,
      //   // selectedCrop,
      //   // file: tiffBlob instanceof Blob ? await blobToBase64(tiffBlob) : null,
      // }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      // console.log(responseData);
      const farmNames = {};
      let farmCounter = 1;

      const newData = responseData.data.map((item) => {
        const key = `${item.selectedid}-${item.selectedPara}-${item.selectedCrop}`;
        if (!farmNames[key]) {
          farmNames[key] = farmCounter.toString();
          farmCounter++;
        }
        return { ...item, farmName: farmNames[key] };
      });
      // console.log(newData);
      setAllData({ data: newData });
    } else {
      console.error(`Error fetching data: ${response.statusText}`);
    }
  };

  const SucroseIcon = () => {
    return (
      <div>
        <svg
          fill="white"
          width="32px"
          height="32px"
          viewBox="0 0 512 512"
          version="1.1"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g>
            <path
              class="st0"
              d="M474.01,89.302L273.877,3.673C268.196,1.235,262.191,0,256,0c-6.19,0-12.195,1.235-17.876,3.673L37.991,89.302
		c-16.74,7.161-27.564,23.558-27.564,41.777v249.853c0,18.21,10.824,34.606,27.564,41.777l200.144,85.628
		C243.815,510.766,249.819,512,256,512c6.182,0,12.186-1.234,17.877-3.663l200.133-85.628c16.739-7.171,27.563-23.577,27.563-41.777
		V131.078C501.573,112.869,490.749,96.462,474.01,89.302z M41.027,380.932V131.078c0-1.372,0.196-2.733,0.578-4.065l205.746,88.029
		V479.01L50.039,394.587C44.564,392.246,41.027,386.878,41.027,380.932z M461.962,394.587L264.659,479.01V215.042l205.736-88.029
		c0.382,1.332,0.579,2.693,0.579,4.065v249.853C470.974,386.878,467.437,392.246,461.962,394.587z M256,30.6
		c2.018,0,3.987,0.401,5.828,1.195l193.56,82.818L256,199.918L56.611,114.613l193.552-82.818C252.014,31.001,253.983,30.6,256,30.6z
		"
            />
            <path
              class="st0"
              d="M94.822,214.052c2.086-3.585,1.146-8.532-2.096-11.048c-3.242-2.518-7.572-1.656-9.667,1.929
		c-2.087,3.595-1.146,8.542,2.095,11.049C88.397,218.5,92.725,217.637,94.822,214.052z"
            />
            <path
              class="st0"
              d="M89.924,336.57c2.086-3.586,1.156-8.532-2.086-11.049c-3.242-2.518-7.572-1.646-9.667,1.94
		c-2.087,3.585-1.146,8.541,2.096,11.048C83.499,341.026,87.838,340.155,89.924,336.57z"
            />
            <path
              class="st0"
              d="M127.488,294.186c2.087-3.595,1.157-8.542-2.086-11.059c-3.252-2.517-7.581-1.645-9.667,1.94
		c-2.086,3.585-1.157,8.532,2.086,11.05C121.073,298.633,125.402,297.761,127.488,294.186z"
            />
            <path
              class="st0"
              d="M158.509,398.308c2.086-3.585,1.147-8.531-2.096-11.048c-3.242-2.518-7.572-1.656-9.658,1.93
		c-2.096,3.595-1.156,8.541,2.086,11.048C152.084,402.755,156.413,401.894,158.509,398.308z"
            />
            <path
              class="st0"
              d="M194.252,346.208c-2.096,3.595-1.156,8.542,2.086,11.058c3.242,2.518,7.582,1.656,9.668-1.929
		c2.086-3.595,1.145-8.542-2.086-11.049C200.667,341.761,196.339,342.633,194.252,346.208z"
            />
            <path
              class="st0"
              d="M225.841,429.496c2.076-3.595,1.146-8.541-2.096-11.048c-3.242-2.518-7.572-1.656-9.667,1.929
		c-2.087,3.586-1.146,8.532,2.095,11.049C219.416,433.953,223.745,433.08,225.841,429.496z"
            />
            <path
              class="st0"
              d="M202.921,263.459c2.076-3.585,1.145-8.532-2.096-11.049c-3.243-2.516-7.572-1.645-9.668,1.94
		c-2.086,3.585-1.146,8.542,2.096,11.049C196.495,267.915,200.825,267.044,202.921,263.459z"
            />
            <path
              class="st0"
              d="M439.287,349.617c-2.086,3.585-1.146,8.531,2.086,11.048c3.252,2.518,7.581,1.646,9.668-1.939
		c2.095-3.586,1.156-8.542-2.087-11.049C445.712,345.16,441.373,346.032,439.287,349.617z"
            />
            <path
              class="st0"
              d="M377.254,316.382c-2.086,3.585-1.145,8.54,2.086,11.048c3.252,2.518,7.582,1.656,9.668-1.939
		c2.096-3.585,1.155-8.532-2.086-11.039C383.679,311.925,379.34,312.798,377.254,316.382z"
            />
            <path
              class="st0"
              d="M446.613,265.673c2.087-3.585,1.146-8.532-2.086-11.04c-3.242-2.517-7.581-1.655-9.667,1.93
		s-1.146,8.542,2.086,11.049C440.187,270.129,444.527,269.268,446.613,265.673z"
            />
            <path
              class="st0"
              d="M351.346,265.673c2.096-3.585,1.156-8.532-2.086-11.04c-3.242-2.517-7.582-1.655-9.668,1.93
		c-2.086,3.585-1.146,8.542,2.086,11.049C344.931,270.129,349.26,269.268,351.346,265.673z"
            />
            <path
              class="st0"
              d="M249.986,82.817c3.586,2.087,8.542,1.146,11.049-2.095c2.518-3.243,1.655-7.572-1.94-9.658
		c-3.585-2.096-8.531-1.156-11.038,2.086C245.529,76.392,246.401,80.722,249.986,82.817z"
            />
            <path
              class="st0"
              d="M159.529,124.408c-2.518,3.242-1.656,7.582,1.93,9.668c3.595,2.086,8.541,1.146,11.048-2.086
		c2.518-3.252,1.656-7.582-1.93-9.668C166.992,120.225,162.046,121.166,159.529,124.408z"
            />
            <path
              class="st0"
              d="M350.072,127.326c3.595,2.087,8.532,1.156,11.049-2.086c2.518-3.252,1.656-7.581-1.93-9.667
		c-3.595-2.096-8.54-1.156-11.048,2.086C345.626,120.911,346.487,125.24,350.072,127.326z"
            />
            <path
              class="st0"
              d="M252.738,169.358c-2.527,3.242-1.655,7.572,1.93,9.667c3.586,2.086,8.542,1.146,11.049-2.095
		c2.518-3.243,1.655-7.572-1.94-9.658C260.193,165.175,255.246,166.115,252.738,169.358z"
            />
            <path
              class="st0"
              d="M228.055,130.412c3.585,2.086,8.532,1.146,11.049-2.096c2.516-3.243,1.645-7.572-1.94-9.668
		c-3.585-2.086-8.54-1.145-11.048,2.096C223.599,123.986,224.47,128.316,228.055,130.412z"
            />
            <path
              class="st0"
              d="M157.031,100.84c3.585,2.096,8.541,1.146,11.048-2.086c2.518-3.242,1.656-7.581-1.93-9.668
		c-3.595-2.095-8.54-1.155-11.048,2.088C152.584,94.415,153.445,98.754,157.031,100.84z"
            />
            <path
              class="st0"
              d="M399.312,189.8c-2.086,3.585-1.145,8.53,2.086,11.048c3.253,2.518,7.582,1.656,9.668-1.93
		c2.096-3.595,1.156-8.531-2.086-11.048C405.739,185.353,401.399,186.214,399.312,189.8z"
            />
            <path
              class="st0"
              d="M313.007,307.518c-2.095,3.585-1.155,8.541,2.086,11.048c3.253,2.517,7.582,1.656,9.668-1.929
		c2.086-3.595,1.156-8.542-2.086-11.05C319.434,303.07,315.094,303.933,313.007,307.518z"
            />
            <path
              class="st0"
              d="M294.642,376.358c-2.086,3.585-1.156,8.532,2.086,11.048c3.252,2.518,7.581,1.646,9.668-1.939
		c2.096-3.586,1.156-8.542-2.087-11.049C301.068,371.9,296.729,372.772,294.642,376.358z"
            />
            <path
              class="st0"
              d="M348.457,398.357c-2.086,3.585-1.146,8.532,2.086,11.05c3.243,2.507,7.582,1.646,9.668-1.94
		c2.086-3.585,1.146-8.541-2.086-11.048C354.882,393.9,350.543,394.762,348.457,398.357z"
            />
          </g>
        </svg>
      </div>
    );
  };

  const YieldIcon = () => {
    return (
      <div>
        <svg
          fill="white"
          width="32px"
          height="32px"
          viewBox="0 0 512 512"
          version="1.1"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path
            fill="white"
            d="M264.34 21.275c-61.1 44.835-108.23 124.229-103.512 198.29 6.36-7.25 13.422-13.883 21.139-19.713 11.146-65.623 49.022-131.354 82.373-178.577zM57.383 22.758c24.174 34.235 50.712 78.19 67.728 124.773 7.978 6.219 15.304 13.215 21.76 20.94a236.975 236.975 0 0 1 3.951-15.287c-16.31-48.832-51.666-104.548-93.44-130.426zm405.053 10.744c-47.361 40.863-69.363 100.554-74.997 158.209a202.35 202.35 0 0 1 8.16 11.328 201.113 201.113 0 0 1 16.737-29.867c9.403-51.405 27.53-101.544 50.1-139.67zm-92.069 3.707c-64.832 14.582-107.75 78.8-116.562 136.773 2.973 1.672 6.73 5.1 9.265 8.455 22.607-66.53 61.275-110.735 107.297-145.228zm-353.123 91.37c51.778 24.363 105.825 56.494 127.035 103.939-2.272-12.34-2.629-25.452-1.396-38.944-28.597-42.532-78.956-63.451-125.639-64.996zm476.056 27.49c-34.406-.802-76.934 23.426-86.128 66.726 1.139 4.58 13.022 13.846 21.013 16.969.773-43.834 37.177-62.218 65.115-83.695zm-174.29 2.181c21.04 21.461 48.917 45.511 61.953 86.13 4.24-2.486 8.63-4.729 13.18-6.693-15.79-31.463-44.049-67.846-75.133-79.437zm-73.265 30.155c-37.362 3.63-64.025 29.123-83.225 58.677-14.63 22.519-23.115 49.683-24.555 76.266 25.986-53.821 62.46-108.757 112.652-127.534zm31.927 13.365c-2.223 2.752-5.084 4.713-7.885 6.818 31.072 26.356 47.903 58.752 56.068 93.111a205.85 205.85 0 0 1 9.504-14.467c-9.09-33.826-32.122-70.188-57.687-85.462zM248.41 215.8a128.121 128.121 0 0 0-9.748 4.63l-1.48 27.127c14.5 11.416 25.42 23.037 34.015 37.332l2.711-49.662c-6.944-6.998-15.319-13.482-25.498-19.426zm-120.312 24.09C71.5 256.71 37.71 308.58 28.604 361.046c29.726-43.263 59.439-87.436 104.86-106.18-1.603-5.314-3.395-10.297-5.366-14.974zm74.738 9.506c-3.896 5.005-7.323 9.1-10.813 14.153 43.782 20.683 60.177 57.427 80.86 93.969-2.173-48.16-27.882-92.375-70.047-108.121zm205.033 2.33c-29.13 10.175-52.395 33.868-69.392 64.065-11.124 19.76-19.43 42.164-24.94 64.672 19.94-27.481 34.02-48.154 47.813-65.518 16.755-21.093 33.426-37.283 58.636-53.603-2.898-5.063-7.514-9.234-12.117-9.615zm22.572 24.243c-5.147 3.297-9.868 6.548-14.26 9.812 23.392 42.081 38.88 88.57 55.426 133.594-1.502-49.435-13.906-99.519-41.166-143.406zM174.115 293.63c-10.184 19.084-19.878 39.48-32.46 59.031l1.687 27.598c12.051 1.164 23.366-1.86 35.72-5.682zm227.905 3.7c-12.309 11.669-21.565 22.225-30.59 33.958 8.607 6.083 19.627 8.03 32.529 8.234l6.086-26.554a405.944 405.944 0 0 0-8.025-15.639zm-169.012 26.702l-2.383 43.643.541-.807c9.337 6.267 18.402 6.229 28.932 4.631-10.136-17.217-18.219-33.414-27.09-47.467zm131.951 24.508l-12.9 56.295c11.853 5.06 22.705 9.387 34.753 9.504l13.045-56.922c-12.158-.504-24.254-2.66-34.898-8.877zm-135.355 37.85l-2.575 47.148c12.128 4.554 23.916 6.054 35.803 4.572l2.688-49.242c-11.093 1.813-23.479 2.755-35.916-2.478zm-49.413 6.656c-10.937 3.273-22.755 6.1-35.74 5.361l3.897 63.762c13.989.1 26.73-.425 35.804-4.287zm167.772 29.656l-12.32 53.764c11.403 4.048 23.029 6.993 34.884 8.937l12.192-53.197c-12.962-.822-24.314-5.066-34.756-9.504zM226.01 452.21L223.729 494h36.052l2.059-37.703c-11.976 1.028-23.997-.38-35.83-4.088zm-40.705 24.514c-11.492 3.648-23.852 3.84-35.85 3.588l.836 13.689h36.07z"
          />
        </svg>
      </div>
    );
  };

  const HarvestDateIcon = () => {
    return (
      <div>
        <svg
          fill="white"
          width="32px"
          height="32px"
          viewBox="0 0 512 512"
          version="1.1"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g>
            <path
              d="M472,60h-8V44c0-13.234-10.766-24-24-24s-24,10.766-24,24v16H96V44c0-13.234-10.766-24-24-24S48,30.766,48,44v16h-8
		C17.944,60,0,77.944,0,100v352c0,22.056,17.944,40,40,40h432c22.056,0,40-17.944,40-40V100C512,77.944,494.056,60,472,60z M432,44
		c0-4.411,3.589-8,8-8s8,3.589,8,8v23.981c0,0.007-0.001,0.013-0.001,0.019S448,68.013,448,68.019V92c0,4.411-3.589,8-8,8
		s-8-3.589-8-8V44z M72,36c4.411,0,8,3.589,8,8v48c0,4.411-3.589,8-8,8s-8-3.589-8-8V68.01c0-0.003,0-0.007,0-0.01s0-0.006,0-0.01
		V44C64,39.589,67.589,36,72,36z M472,476H40c-13.234,0-24-10.766-24-24V148h384c4.418,0,8-3.582,8-8s-3.582-8-8-8H16v-32
		c0-13.234,10.766-24,24-24h8v16c0,13.234,10.766,24,24,24s24-10.766,24-24V76h320v16c0,13.234,10.766,24,24,24s24-10.766,24-24V76
		h8c13.234,0,24,10.766,24,24v32h-16c-4.418,0-8,3.582-8,8s3.582,8,8,8h16v304C496,465.234,485.234,476,472,476z"
            />
            <path d="M448,132h-16c-4.418,0-8,3.582-8,8s3.582,8,8,8h16c4.418,0,8-3.582,8-8S452.418,132,448,132z" />
            <path
              d="M201.546,253.764l44.103-44.103c0.188-0.188,0.366-0.385,0.535-0.591c0.072-0.087,0.133-0.179,0.201-0.268
		c0.09-0.119,0.182-0.236,0.265-0.361c0.074-0.11,0.138-0.225,0.206-0.338c0.066-0.11,0.135-0.218,0.196-0.332
		c0.063-0.118,0.117-0.24,0.174-0.361c0.055-0.115,0.112-0.229,0.161-0.347s0.089-0.24,0.132-0.361
		c0.045-0.125,0.093-0.25,0.132-0.378c0.037-0.122,0.064-0.245,0.095-0.368c0.033-0.13,0.069-0.258,0.095-0.391
		c0.029-0.144,0.046-0.29,0.066-0.435c0.016-0.113,0.038-0.224,0.049-0.338c0.052-0.526,0.052-1.055,0-1.581
		c-0.011-0.114-0.033-0.225-0.049-0.338c-0.021-0.145-0.038-0.291-0.066-0.435c-0.026-0.132-0.063-0.261-0.095-0.391
		c-0.031-0.123-0.058-0.247-0.095-0.368c-0.039-0.128-0.087-0.252-0.132-0.378c-0.043-0.121-0.083-0.242-0.132-0.361
		s-0.107-0.232-0.161-0.347c-0.057-0.121-0.111-0.243-0.174-0.361c-0.061-0.114-0.13-0.222-0.196-0.332
		c-0.068-0.113-0.132-0.228-0.206-0.338c-0.083-0.124-0.175-0.241-0.265-0.361c-0.067-0.089-0.129-0.181-0.201-0.268
		c-0.335-0.409-0.71-0.784-1.119-1.119c-0.084-0.069-0.172-0.128-0.258-0.193c-0.123-0.093-0.243-0.187-0.371-0.273
		c-0.107-0.072-0.219-0.133-0.328-0.199c-0.114-0.068-0.225-0.14-0.343-0.203c-0.114-0.061-0.23-0.112-0.346-0.167
		c-0.121-0.057-0.24-0.118-0.364-0.169c-0.112-0.046-0.226-0.083-0.339-0.124c-0.133-0.048-0.264-0.099-0.4-0.14
		c-0.113-0.034-0.227-0.059-0.341-0.088c-0.139-0.035-0.276-0.074-0.418-0.102c-0.13-0.026-0.261-0.041-0.392-0.06
		c-0.127-0.019-0.253-0.043-0.382-0.055c-0.232-0.023-0.465-0.033-0.698-0.035c-0.03,0-0.059-0.004-0.089-0.004H152
		c-4.418,0-8,3.582-8,8s3.582,8,8,8h68.683l-42.343,42.343c-0.188,0.188-0.366,0.385-0.535,0.591
		c-0.072,0.087-0.133,0.179-0.201,0.268c-0.09,0.119-0.182,0.236-0.265,0.361c-0.074,0.11-0.138,0.225-0.206,0.338
		c-0.066,0.11-0.135,0.218-0.196,0.332c-0.063,0.118-0.116,0.239-0.173,0.359c-0.055,0.116-0.113,0.23-0.162,0.35
		c-0.049,0.118-0.088,0.238-0.131,0.358c-0.045,0.126-0.094,0.251-0.133,0.38c-0.037,0.122-0.064,0.245-0.095,0.368
		c-0.033,0.13-0.069,0.258-0.095,0.391c-0.029,0.144-0.046,0.29-0.066,0.435c-0.016,0.113-0.038,0.224-0.049,0.338
		c-0.052,0.526-0.052,1.055,0,1.581c0.011,0.114,0.033,0.225,0.049,0.338c0.021,0.145,0.038,0.291,0.066,0.435
		c0.026,0.132,0.063,0.261,0.095,0.391c0.031,0.123,0.058,0.247,0.095,0.368c0.039,0.129,0.088,0.254,0.133,0.38
		c0.043,0.12,0.082,0.24,0.131,0.358c0.049,0.119,0.107,0.233,0.162,0.35c0.057,0.12,0.11,0.241,0.173,0.359
		c0.061,0.114,0.13,0.222,0.196,0.332c0.068,0.113,0.132,0.228,0.206,0.338c0.083,0.124,0.175,0.241,0.265,0.361
		c0.067,0.089,0.129,0.181,0.201,0.268c0.335,0.409,0.71,0.784,1.119,1.119c0.084,0.069,0.172,0.128,0.258,0.193
		c0.123,0.093,0.243,0.187,0.371,0.273c0.108,0.072,0.22,0.134,0.33,0.2c0.113,0.068,0.224,0.139,0.341,0.201
		c0.115,0.062,0.234,0.114,0.351,0.169c0.119,0.056,0.236,0.115,0.358,0.166c0.115,0.047,0.232,0.085,0.348,0.127
		c0.13,0.047,0.258,0.097,0.391,0.137c0.117,0.035,0.236,0.061,0.354,0.091c0.134,0.034,0.267,0.072,0.404,0.099
		c0.139,0.028,0.279,0.044,0.419,0.064c0.118,0.017,0.234,0.04,0.354,0.051c0.262,0.026,0.526,0.04,0.789,0.04
		c39.701,0,72,32.299,72,72s-32.299,72-72,72c-18.959,0-36.856-7.307-50.394-20.575c-3.155-3.093-8.221-3.042-11.313,0.114
		c-3.093,3.155-3.042,8.22,0.114,11.313c16.546,16.217,38.42,25.148,61.593,25.148c48.523,0,88-39.477,88-88
		C271.993,297.489,241.688,261.922,201.546,253.764z"
            />
            <path
              d="M351.96,203.213c-0.011-0.114-0.033-0.225-0.049-0.338c-0.021-0.145-0.038-0.291-0.066-0.435
		c-0.026-0.132-0.063-0.261-0.095-0.391c-0.031-0.123-0.058-0.247-0.095-0.368c-0.039-0.128-0.087-0.252-0.132-0.378
		c-0.043-0.121-0.083-0.242-0.132-0.361s-0.107-0.232-0.161-0.347c-0.057-0.121-0.111-0.243-0.174-0.361
		c-0.061-0.114-0.13-0.222-0.196-0.332c-0.068-0.113-0.132-0.228-0.206-0.338c-0.083-0.124-0.175-0.241-0.265-0.361
		c-0.067-0.089-0.129-0.181-0.201-0.268c-0.335-0.409-0.71-0.784-1.119-1.119c-0.084-0.069-0.172-0.128-0.258-0.193
		c-0.123-0.093-0.243-0.187-0.371-0.273c-0.107-0.072-0.219-0.133-0.328-0.199c-0.114-0.068-0.225-0.14-0.343-0.203
		c-0.114-0.061-0.23-0.112-0.346-0.167c-0.121-0.057-0.24-0.118-0.364-0.169c-0.112-0.046-0.226-0.083-0.339-0.124
		c-0.133-0.048-0.264-0.099-0.4-0.14c-0.113-0.034-0.227-0.059-0.341-0.088c-0.139-0.035-0.276-0.074-0.418-0.102
		c-0.13-0.026-0.261-0.041-0.392-0.06c-0.127-0.019-0.253-0.043-0.382-0.055c-0.232-0.023-0.465-0.033-0.698-0.035
		c-0.03,0-0.059-0.004-0.089-0.004s-0.059,0.004-0.089,0.004c-0.233,0.003-0.466,0.012-0.698,0.035
		c-0.129,0.012-0.255,0.036-0.382,0.055c-0.131,0.019-0.262,0.034-0.392,0.06c-0.141,0.028-0.279,0.066-0.418,0.102
		c-0.114,0.029-0.228,0.054-0.341,0.088c-0.136,0.041-0.267,0.092-0.4,0.14c-0.113,0.041-0.228,0.078-0.339,0.124
		c-0.124,0.051-0.243,0.112-0.364,0.169c-0.116,0.055-0.232,0.106-0.346,0.167c-0.117,0.063-0.229,0.134-0.343,0.203
		c-0.11,0.066-0.221,0.128-0.328,0.199c-0.128,0.086-0.249,0.18-0.371,0.273c-0.086,0.065-0.174,0.124-0.258,0.193
		c-0.206,0.169-0.404,0.347-0.592,0.535l-39.996,39.996c-3.125,3.124-3.125,8.189,0,11.313c1.562,1.562,3.609,2.343,5.657,2.343
		s4.095-0.781,5.657-2.343L336,223.317v196.687c0,4.418,3.582,8,8,8s8-3.582,8-8V204.006
		C352,203.741,351.986,203.477,351.96,203.213z"
            />
          </g>
        </svg>
      </div>
    );
  };

  useEffect(() => {
    if (Object.keys(allDates).length > 0) setSecondcontainervisible(true);
  }, [allDates]);

  useEffect(() => {
    GetAllData();
  }, []);

  return (
    <>
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        zoomControl={false}
        whenReady={() => {}}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        {/* <MyComponent /> */}
        {selected && (
          <GeoJSON
            key={JSON.stringify(geodata2)}
            data={geodata2}
            onEachFeature={onEachRoad2}
          />
        )}

        {/* Layers */}

        {maptype && (
          <div>
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </div>
        )}

        {!maptype && (
          <div>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </div>
        )}

        <ZoomControl position="topright" />

        {tiffUrl && <GeoTiffLayer url={tiffUrl} options={options} />}
        {geojsonData && (
          <GeoJSON key={JSON.stringify(geojsonData)} data={geojsonData} />
        )}

        <FeatureGroup>
          <EditControl
            onCreated={onDrawCreate}
            onDrawStart={onStartDraw}
            draw={{
              circle: true,
              marker: true,
              polyline: true,
              rectangle: true,
              circlemarker: true,
              polygon: true,
            }}
            edit={{
              remove: true,
              edit: true,
            }}
          />
        </FeatureGroup>

        {/* Area of interest */}

        {aoivisible && (
          <div
            style={{
              backgroundColor: "rgba(26, 39, 55, 1)",
              zIndex: "999",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "absolute",
              left: "27px",
              borderRadius: "16px",
              padding: "3px",
              width: "300px",
              justifyContent: "flex-start",
              flexFlow: "column",
              top: "80px",
              paddingBottom: "0.4rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  color: "white",
                  fontSize: "12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Red Hat Display",
                    marginLeft: "6px",
                    fontSize: "13px",
                  }}
                >
                  {russian ? "Область интересов" : "Area Of Interest"}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  backgroundColor: "#1A273",
                  padding: "5px",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                <span
                  style={{ marginLeft: "8px", color: "rgba(26, 39, 55, 1)" }}
                >
                  {" "}
                  ddddddddd
                </span>
              </div>

              <button
                style={{
                  zIndex: 999,
                  display: "flex",
                  color: "white",
                  margin: "10px",
                  borderRadius: "30px",
                  background: "none",
                  border: "none",
                  padding: "8px 16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Red Hat Display",
                    marginLeft: "8px",
                    marginRight: "4px",
                    lineHeight: "2px",
                  }}
                ></span>
              </button>

              <div
                style={{
                  display: "flex",
                  margin: "5px",
                  justifyContent: "space-between",
                  backgroundColor: "#ffffff14",
                }}
              ></div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "",
                margin: "5px",
                backgroundColor: "#1A2737",
              }}
            >
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  backgroundColor: "#1A2737",
                  borderRadius: "20px",
                  borderWidth: "0.5px",
                  borderColor: "grey",
                  width: "170px",
                  color: "white",
                  border: "0.4px solid rgba(255, 255, 255, 0.16)",
                  fontFamily: "Red Hat Display",
                  fontWeight: "400px",
                  fontSize: "12px",
                  paddingLeft: "1rem",
                }}
                placeholder={
                  russian ? "Поиск местоположения" : "Search Location"
                }
              />

              <button
                onClick={searchLocation}
                style={{
                  marginLeft: "10px",
                  borderRadius: "54%",
                  border: "none",
                  height: "2em",
                  width: "2em",
                  cursor: "pointer",
                  verticalAlign: "middle",
                  position: "relative", // Add this line to enable positioning
                }}
              >
                <SearchIcon
                  style={{
                    color: "#4CB963",
                    verticalAlign: "middle",
                    position: "absolute", // Add this line to enable positioning
                    top: "2px", // Adjust the value to move the icon lower
                  }}
                />
              </button>

              {/*upload geojson button */}
              <button
                style={{
                  marginLeft: "15px",
                  borderRadius: "54%",
                  border: "none",
                  height: "2em",
                  width: "2em",
                  cursor: "pointer",
                  verticalAlign: "middle",
                }}
              >
                <label htmlFor="file-upload">
                  <MdUploadFile
                    style={{
                      color: "#4CB963",
                      verticalAlign: "bottom",
                      marginBottom: "2px",
                      fontSize: "16px",
                    }}
                  />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
                <Shapefile data={data} />
              </button>

              <SetViewOnClick coords={coords} map={mapRef.current} />
            </div>
          </div>
        )}

        {resultListClicked && (
          <>
            <div
              style={{
                backgroundColor: "#4C54D1",
                zIndex: "999",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                position: "absolute",
                left: "27px",
                borderRadius: "24px",
                width: "350px",
                flexFlow: "column",
                top: "80px",
                paddingBottom: "0.4rem",
                height:
                  isOpenPara && isOpenCrop
                    ? "600px"
                    : isOpenPara || isOpenCrop
                    ? "480px"
                    : "380px",
              }}
            ></div>

            <div
              style={{
                backgroundColor: "rgba(26, 39, 55, 1)",
                zIndex: "999",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                position: "absolute",
                left: "27px",
                borderRadius: "24px",
                width: "350px",
                flexFlow: "column",
                top: "100px",
                paddingBottom: "0.4rem",
                height:
                  isOpenPara && isOpenCrop
                    ? "600px"
                    : isOpenPara || isOpenCrop
                    ? "480px"
                    : "380px",
              }}
            >
              {/*Crops dropdown */}
              <div>
                {/* Text div */}
                <div
                  style={{
                    display: "flex",
                    color: "white",
                    alignItems: "center",
                    fontSize: "16px",
                    paddingTop: "12px",
                    paddingLeft: "2px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                      marginLeft: "8px",
                      fontSize: "12px",
                    }}
                  >
                    <GiWheat />
                  </div>

                  <span
                    style={{
                      fontFamily: "Red Hat Display",
                      marginLeft: "8px",
                      marginBottom: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {russian ? "Обрезать" : "Crop"}
                  </span>
                </div>

                {/* Crops2 div */}

                <div
                  style={{
                    paddingLeft: "1rem",
                    ...(isOpenCrop
                      ? {
                          borderRadius: "25px",
                          overflow: "hidden",
                        }
                      : {
                          borderRadius: "40px",
                          overflow: "hidden",
                        }),
                  }}
                >
                  {/* Open Close */}

                  <Button
                    onClick={dropdownButtonCrop}
                    style={{
                      placeholder: "+sdfdf",
                      zIndex: 999,
                      display: "flex",
                      width: "270px",
                      margin: "4px",
                      fontSize: "12px",
                      padding: "5px",
                      borderRadius: "32px",
                      color: "rgba(255, 255, 255, 0.48)",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "Red Hat Display",
                      marginRight: "10px",
                      color: "rgba(255, 255, 255, 0.48)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      textTransform: "none",
                    }}
                  >
                    <span style={{ marginLeft: "10px" }}>
                      {isOpenCrop
                        ? selectedCrop
                          ? russian
                            ? cropTranslations[selectedCrop]?.ru
                            : cropTranslations[selectedCrop]?.en
                          : russian
                          ? "Выбрать культуру"
                          : "Select Crop"
                        : selectedCrop
                        ? russian
                          ? cropTranslations[selectedCrop]?.ru
                          : cropTranslations[selectedCrop]?.en
                        : russian
                        ? "Выбрать культуру"
                        : "Select Crop"}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#3F4A57",
                        borderRadius: "50%",
                        width: "2rem",
                        height: "2rem",
                        cursor: "pointer",
                      }}
                    >
                      {isOpenCrop ? (
                        <BiUpArrowAlt style={{ color: "white" }} />
                      ) : (
                        <BiDownArrowAlt style={{ color: "white" }} />
                      )}
                    </div>
                  </Button>

                  {isOpenCrop && (
                    <div className="dropdown">
                      <ul
                        style={{
                          listStyle: "none",
                          paddingLeft: "8px",
                          marginLeft: "10px",
                          marginBottom: "20px",
                          marginTop: "6px",
                        }}
                      >
                        <li style={{}}>
                          <button
                            onClick={onClickSugarCane}
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              fontFamily: "Red Hat Display",
                              color: "white",
                            }}
                          >
                            Sugarcane
                          </button>
                        </li>

                        <li style={{}}>
                          <button
                            onClick={onClickDatePalm}
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              fontFamily: "Red Hat Display",
                              color: "white",
                            }}
                          >
                            Date Palm
                          </button>
                        </li>

                        <li style={{}}>
                          <button
                            onClick={onClickPotato}
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              color: "white",
                              fontFamily: "Red Hat Display",
                            }}
                          >
                            {russian ? "Картошка" : "Potato"}
                          </button>
                        </li>

                        <li style={{}}>
                          <button
                            onClick={onCLickChilli}
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              color: "white",
                              fontFamily: "Red Hat Display",
                            }}
                          >
                            {russian ? "Картошка" : "Chilli"}
                          </button>
                        </li>

                        <li style={{}}>
                          <button
                            onClick={onClickPalm}
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              color: "white",
                              fontFamily: "Red Hat Display",
                            }}
                          >
                            {russian ? "Картошка" : "Palm"}
                          </button>
                        </li>

                        <li style={{ marginBottom: "10px" }}>
                          <button
                            onClick={onClickCotton}
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              borderRadius: 32,
                              background: "#1A2737",
                              color: "white",
                              fontFamily: "Red Hat Display",
                              justifyContent: "flex-start",
                            }}
                          >
                            <span style={{ marginRight: "8px" }}>
                              {russian ? "Хлопок" : "Cotton"}
                            </span>
                          </button>
                        </li>

                        <li style={{ marginBottom: "10px" }}>
                          <button
                            onClick={onClickCorn}
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              fontFamily: "Red Hat Display",
                              color: "white",
                            }}
                          >
                            {russian ? "Кукуруза" : "Corn"}
                          </button>
                        </li>

                        <li style={{ marginBottom: "10px" }}>
                          <button
                            onClick={onClickWheat}
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              color: "white",
                              fontFamily: "Red Hat Display",
                            }}
                          >
                            {russian ? "Пшеница" : "Wheat"}
                          </button>
                        </li>

                        <li style={{ marginBottom: "10px" }}>
                          <button
                            onClick={onClickBarley}
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              color: "white",
                              fontFamily: "Red Hat Display",
                            }}
                          >
                            {russian ? "Ячмень" : "Barley"}
                          </button>
                        </li>

                        <li style={{ marginBottom: "10px" }}>
                          <button
                            onClick={onClickAlfalfa}
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              color: "white",
                              fontFamily: "Red Hat Display",
                            }}
                          >
                            {russian ? "Люцерна" : "Alfalfa"}
                          </button>
                        </li>

                        <li style={{ marginBottom: "10px" }}>
                          <button
                            onClick={onClickSunflower}
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              color: "white",
                              fontFamily: "Red Hat Display",
                            }}
                          >
                            {russian ? "Подсолнечник" : "Sunflower"}
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/*Middle Paras dropdown */}
              <div>
                <div
                  style={{
                    display: "flex",
                    color: "white",
                    alignItems: "center",
                    fontSize: "16px",
                    paddingTop: "12px",
                    paddingLeft: "9px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                      marginLeft: "8px",
                      fontSize: "12px",
                    }}
                  >
                    <ImStack />
                  </div>

                  <span
                    style={{
                      fontFamily: "Red Hat Display",
                      marginLeft: "8px",
                      marginBottom: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {russian ? "Параметры" : "Parameters"}
                  </span>
                </div>

                <div
                  style={{
                    paddingLeft: "1rem",
                    ...(isOpenPara
                      ? {
                          borderRadius: "25px",
                          overflow: "hidden",
                        }
                      : {
                          borderRadius: "40px",
                          overflow: "hidden",
                        }),
                  }}
                >
                  {/* Open Close */}

                  <Button
                    onClick={dropdownButtonPara}
                    style={{
                      placeholder: "+sdfdf",
                      zIndex: 999,
                      display: "flex",
                      width: "270px",
                      margin: "4px",
                      fontSize: "12px",
                      padding: "5px",
                      borderRadius: "32px",
                      color: "rgba(255, 255, 255, 0.48)",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "Red Hat Display",
                      marginRight: "10px",
                      color: "rgba(255, 255, 255, 0.48)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      textTransform: "none",
                    }}
                  >
                    <span style={{ marginLeft: "10px" }}>
                      {isOpenPara
                        ? selectedParameter
                          ? russian
                            ? Paratranslations[selectedParameter]?.ru
                            : Paratranslations[selectedParameter]?.en
                          : russian
                          ? "Выбрать параметр"
                          : "Select Parameter"
                        : selectedParameter
                        ? russian
                          ? Paratranslations[selectedParameter]?.ru
                          : Paratranslations[selectedParameter]?.en
                        : russian
                        ? "Выбрать параметр"
                        : "Select Parameter"}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#3F4A57",
                        borderRadius: "50%",
                        width: "2rem",
                        height: "2rem",
                        cursor: "pointer",
                      }}
                    >
                      {isOpenPara ? (
                        <BiUpArrowAlt style={{ color: "white" }} />
                      ) : (
                        <BiDownArrowAlt style={{ color: "white" }} />
                      )}
                    </div>
                  </Button>

                  {isOpenPara && (
                    <div className="dropdown">
                      <ul
                        style={{
                          listStyle: "none",
                          paddingLeft: "8px",
                          marginLeft: "10px",
                          marginBottom: "20px",
                          marginTop: "6px",
                        }}
                      >
                        <li style={{ marginBottom: "10px" }}>
                          <button
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              fontFamily: "Red Hat Display",
                              color: "white",
                            }}
                            onClick={onClickYield}
                          >
                            {russian ? "Урожайность" : "Crop Yield"}
                          </button>
                        </li>

                        <li style={{ marginBottom: "10px" }}>
                          <button
                            className="custom-button"
                            onClick={onClickET}
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              color: "white",
                              fontFamily: "Red Hat Display",
                            }}
                          >
                            {russian
                              ? "Эвапотранспирация"
                              : "Evapotranspiration"}
                          </button>
                        </li>

                        <li style={{ marginBottom: "10px" }}>
                          <button
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              color: "white",
                              fontFamily: "Red Hat Display",
                            }}
                            onClick={onClickIWR}
                          >
                            {russian ? "Индекс водоресурсов" : "IWR"}
                          </button>
                        </li>

                        <li style={{ marginBottom: "10px" }}>
                          <button
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              color: "white",
                              fontFamily: "Red Hat Display",
                            }}
                            onClick={onClickWaterProd}
                          >
                            {russian
                              ? "Водопроизводительность"
                              : "Water Productivity"}
                          </button>
                        </li>

                        <li style={{ marginBottom: "10px" }}>
                          <button
                            className="custom-button"
                            style={{
                              zIndex: 999,
                              margin: "5px",
                              display: "flex",
                              background: "#1A2737",
                              border: "none",
                              borderRadius: 32,
                              color: "white",
                              fontFamily: "Red Hat Display",
                            }}
                            onClick={onClickBiotic}
                          >
                            {russian
                              ? "Водопроизводительность"
                              : "Biotic Stress"}
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/*List dropdown */}
              <div>
                <div
                  style={{
                    display: "flex",
                    color: "white",
                    alignItems: "center",
                    fontSize: "16px",
                    paddingTop: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                      marginLeft: "8px",
                      fontSize: "12px",
                    }}
                  >
                    <FaHistory />
                  </div>

                  <span
                    style={{
                      fontFamily: "Red Hat Display",
                      marginLeft: "8px",
                      marginBottom: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {russian ? "Результаты" : "Results"}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: "13px",
                    borderRadius: "5px",
                    background: "rgba(26, 39, 55, 1)",
                    alignItems: "center",
                    fontFamily: "Red Hat Display",
                    height: "140px",
                    overflowY: "scroll",
                    color: "white",
                    flexDirection: "column",
                    gap: "2rem",
                  }}
                >
                  <>
                    {filteredData
                      .sort(
                        (a, b) =>
                          new Date(b.selecteddate) - new Date(a.selecteddate)
                      )
                      .map((item, index) => (
                        <div style={{ width: "100%" }} key={index}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              gap: "1rem",
                              marginLeft: "19px",
                            }}
                          >
                            <input
                              type="checkbox"
                              id={index}
                              checked={checkedIndex == index}
                              onChange={() =>
                                handleTickClick(
                                  item.selectedtiff,
                                  item.selectedjson,
                                  item.selectedPara,
                                  index,
                                  item.selectedmean,
                                  item.id
                                )
                              }
                            />
                            <p>{formatDate(item.selecteddate)}</p>
                            <p>
                              {russian ? "Ферма" : "Farm"} {item.farmName}
                            </p>
                            <p style={{ color: "#1A2737" }}>yessss</p>
                          </div>
                        </div>
                      ))}
                  </>
                </div>
              </div>
            </div>

            {/* <div
              style={{
                backgroundColor: "rgba(26, 39, 55, 1)",
                zIndex: "999",
                display: "flex",
                position: "absolute",
                left: "27px",
                borderRadius: "24px",
                width: "350px",
                bottom: "20px",
                height: "100px",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  display: "flex",
                  marginLeft: "1rem",
                  color: "white",
                  fontFamily: "Red Hat Display",
                }}
              >
                Timeline
              </span>
              <div style={{ width: "80%" }}>
                <Slider
                  aria-label="Month"
                  defaultValue={1} // Default to January (1-based index)
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => monthLabels[value - 1]}
                  step={1}
                  marks={monthLabels.map((label, index) => ({
                    value: index + 1,
                    label,
                  }))}
                  min={1}
                  max={12}
                />
              </div>
            </div> */}
          </>
        )}

        {/*Agri Ai popups */}

        {settingTabVisible && (
          <div
            style={{
              backgroundColor: "#1A2737",
              width: "200px",
              zIndex: "999",
              display: "flex",
              flexFlow: "column",
              justifyContent: "flex-start",
              justifyItems: "flex-start",
              alignItems: "flex-start",
              position: "absolute",
              right: "40px",
              borderRadius: "25px",
              padding: "10px",
              top: "110px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                margin: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "5px",
                }}
              >
                <HorizontalLineIcon />
                <HorizontalLineIcon />
                <HorizontalLineIcon />
              </div>
              <span
                style={{
                  fontFamily: "Red Hat Display",
                  marginLeft: "8px",
                  color: "white",
                }}
              >
                Settings
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                margin: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "5px",
                }}
              >
                <HorizontalLineIcon />
                <HorizontalLineIcon />
                <HorizontalLineIcon />
              </div>
              <span
                style={{
                  fontFamily: "Red Hat Display",
                  marginLeft: "8px",
                  color: "white",
                }}
              >
                Train Model
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                margin: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "5px",
                }}
              >
                <HorizontalLineIcon />
                <HorizontalLineIcon />
                <HorizontalLineIcon />
              </div>
              <span
                style={{
                  fontFamily: "Red Hat Display",
                  marginLeft: "8px",
                  color: "white",
                }}
              >
                Visualized Data
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                margin: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "5px",
                }}
              >
                <HorizontalLineIcon />
                <HorizontalLineIcon />
                <HorizontalLineIcon />
              </div>
              <span
                style={{
                  fontFamily: "Red Hat Display",
                  marginLeft: "8px",
                  color: "white",
                }}
              >
                Pricing Plans
              </span>
            </div>
            <DividerLineHorizontalIcon />
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                margin: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "5px",
                }}
              >
                <HorizontalLineIcon />
                <HorizontalLineIcon />
                <HorizontalLineIcon />
              </div>
              <span
                style={{
                  fontFamily: "Red Hat Display",
                  marginLeft: "8px",
                  color: "white",
                }}
              >
                Privacy Policy
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                margin: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "5px",
                }}
              >
                <HorizontalLineIcon />
                <HorizontalLineIcon />
                <HorizontalLineIcon />
              </div>
              <span
                style={{
                  fontFamily: "Red Hat Display",
                  marginLeft: "8px",
                  color: "white",
                }}
              >
                Terms and Conditions
              </span>
            </div>
            <DividerLineHorizontalIcon />
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                margin: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "5px",
                }}
              >
                <HorizontalLineIcon />
                <HorizontalLineIcon />
                <HorizontalLineIcon />
              </div>
              <span
                style={{
                  fontFamily: "Red Hat Display",
                  marginLeft: "8px",
                  color: "white",
                }}
              >
                Sign Out
              </span>
            </div>
          </div>
        )}

        {aoivisible && (
          <div
            className="map-controls-container"
            style={{
              backgroundColor: "#1A2737",
              zIndex: "2000",
              display: "flex",
              flexFlow: "column",
              position: "absolute",
              left: "27px",
              top: "175px",
              fontFamily: "Arial, sans-serif", // Updated font family
              borderRadius: "16px",
              alignItems: "flex-start",
              padding: "5px",
              width: "300px",
              paddingRight: "0.4rem",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "white",
                alignItems: "center",
                fontSize: "16px",
                paddingTop: "12px",
                paddingLeft: "9px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                  marginLeft: "8px",
                  fontSize: "12px",
                }}
              >
                <MdDraw />
              </div>

              <span
                style={{
                  fontFamily: "Red Hat Display",
                  marginLeft: "8px",
                  marginBottom: "10px",
                  fontSize: "12px",
                }}
              >
                {russian ? "Нарисовать границу" : "Draw Boundary"}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                backgroundColor: "#1A2737",
                margin: "2px",
                paddingLeft: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "25px",
                }}
              >
                <button
                  className="custom-button"
                  background="red"
                  onClick={() =>
                    document
                      .getElementsByClassName("leaflet-draw-draw-polyline")[0]
                      .click()
                  }
                  style={{
                    zIndex: 999,
                    display: "flex",
                    background: "#1A2737",
                    color: "white",
                    border: "none",
                    alignItems: "center",
                  }}
                >
                  |
                </button>

                <button
                  className="custom-button"
                  style={{
                    zIndex: 999,
                    margin: "5px",
                    display: "flex",
                    background: "#1A2737",
                    justifyContent: "center", // centers the button content horizontally
                    alignItems: "center", // centers the button content vertically
                    color: "white",
                    border: "none",
                  }}
                  onClick={() =>
                    document
                      .getElementsByClassName("leaflet-draw-draw-polygon")[0]
                      .click()
                  }
                >
                  <HiOutlineMinus
                    style={{
                      fill: "white",
                      marginLeft: "-16px",
                      fontSize: "16px",
                      opacity: 0.2,
                      transform: "rotate(90deg)",
                      height: "20px",
                    }}
                  />
                  <SiGraphql
                    style={{
                      fill: "white",
                      marginLeft: "5px",
                      fontSize: "16px",
                    }}
                  />
                </button>

                <button
                  className="custom-button"
                  style={{
                    zIndex: 999,
                    margin: "5px",
                    display: "flex",
                    background: "#1A2737",
                    justifyContent: "center", // centers the button content horizontally
                    alignItems: "center", // centers the button content vertically
                    color: "white",
                    border: "none",
                  }}
                  onClick={() =>
                    document
                      .getElementsByClassName("leaflet-draw-draw-rectangle")[0]
                      .click()
                  }
                >
                  <HiOutlineMinus
                    style={{
                      fill: "white",
                      marginLeft: "-16px",
                      fontSize: "16px",
                      opacity: 0.2,
                      transform: "rotate(90deg)",
                      height: "20px",
                    }}
                  />
                  <BsTextarea
                    style={{
                      fill: "white",
                      marginLeft: "5px",
                      fontSize: "16px",
                    }}
                  />
                </button>

                <button
                  className="custom-button"
                  style={{
                    zIndex: 999,
                    margin: "5px",
                    display: "flex",
                    background: "#1A2737",
                    justifyContent: "center", // centers the button content horizontally
                    alignItems: "center",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() =>
                    document
                      .getElementsByClassName("leaflet-draw-draw-circle")[0]
                      .click()
                  }
                >
                  <HiOutlineMinus
                    style={{
                      fill: "white",
                      marginLeft: "-16px",
                      fontSize: "16px",
                      opacity: 0.2,
                      transform: "rotate(90deg)",
                      height: "20px",
                    }}
                  />
                  <BsCircle
                    style={{
                      fill: "white",
                      marginLeft: "5px",
                      fontSize: "16px",
                    }}
                  />
                </button>

                <div
                  className="area-text"
                  style={{
                    display: "flex",
                    fontFamily: "Red Hat Display",
                    fontWeight: "bold",
                    fontSize: "12px",
                    paddingBottom: "1rem",
                  }}
                >
                  {areaOfPolygon} Km <sup>2</sup>{" "}
                </div>
              </div>
            </div>

            {/* Text div */}
            <div
              style={{
                display: "flex",
                color: "white",
                alignItems: "center",
                fontSize: "16px",
                paddingTop: "12px",
                paddingLeft: "9px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                  marginLeft: "8px",
                  fontSize: "12px",
                }}
              >
                <GiWheat />
              </div>

              <span
                style={{
                  fontFamily: "Red Hat Display",
                  marginLeft: "8px",
                  marginBottom: "10px",
                  fontSize: "12px",
                }}
              >
                {russian ? "Обрезать" : "Crop"}
              </span>
            </div>

            {/* Parameters div */}

            <div
              style={{
                paddingLeft: "1rem",
                ...(isOpenCrop
                  ? {
                      borderRadius: "25px",
                      overflow: "hidden",
                    }
                  : {
                      borderRadius: "40px",
                      overflow: "hidden",
                    }),
              }}
            >
              {/* Open Close */}

              <Button
                onClick={dropdownButtonCrop}
                style={{
                  placeholder: "+sdfdf",
                  zIndex: 999,
                  display: "flex",
                  width: "270px",
                  margin: "4px",
                  fontSize: "12px",
                  padding: "5px",
                  borderRadius: "32px",
                  color: "rgba(255, 255, 255, 0.48)",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "Red Hat Display",
                  marginRight: "10px",
                  color: "rgba(255, 255, 255, 0.48)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  textTransform: "none",
                }}
              >
                <span style={{ marginLeft: "10px" }}>
                  {isOpenCrop
                    ? selectedCrop
                      ? russian
                        ? cropTranslations[selectedCrop]?.ru
                        : cropTranslations[selectedCrop]?.en
                      : russian
                      ? "Выбрать культуру"
                      : "Select Crop"
                    : selectedCrop
                    ? russian
                      ? cropTranslations[selectedCrop]?.ru
                      : cropTranslations[selectedCrop]?.en
                    : russian
                    ? "Выбрать культуру"
                    : "Select Crop"}
                </span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3F4A57",
                    borderRadius: "50%",
                    width: "2rem",
                    height: "2rem",
                    cursor: "pointer",
                  }}
                >
                  {isOpenCrop ? (
                    <BiUpArrowAlt style={{ color: "white" }} />
                  ) : (
                    <BiDownArrowAlt style={{ color: "white" }} />
                  )}
                </div>
              </Button>

              {isOpenCrop && (
                <div className="dropdown">
                  <ul
                    style={{
                      listStyle: "none",
                      paddingLeft: "8px",
                      marginLeft: "10px",
                      marginBottom: "20px",
                      marginTop: "6px",
                    }}
                  >
                    <li style={{}}>
                      <button
                        onClick={onClickSugarCane}
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          fontFamily: "Red Hat Display",
                          color: "white",
                        }}
                      >
                        Sugarcane
                      </button>
                    </li>

                    <li style={{}}>
                      <button
                        onClick={onClickPotato}
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        {russian ? "Картошка" : "Potato"}
                      </button>
                    </li>

                    <li style={{}}>
                      <button
                        onClick={onClickDatePalm}
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          fontFamily: "Red Hat Display",
                          color: "white",
                        }}
                      >
                        Date Palm
                      </button>
                    </li>

                    <li style={{}}>
                      <button
                        onClick={onCLickChilli}
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        {russian ? "Картошка" : "Chilli"}
                      </button>
                    </li>

                    <li style={{}}>
                      <button
                        onClick={onClickPalm}
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        {russian ? "Картошка" : "Palm"}
                      </button>
                    </li>

                    <li style={{ marginBottom: "10px" }}>
                      <button
                        onClick={onClickCotton}
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          borderRadius: 32,
                          background: "#1A2737",
                          color: "white",
                          fontFamily: "Red Hat Display",
                          justifyContent: "flex-start",
                        }}
                      >
                        <span style={{ marginRight: "8px" }}>
                          {russian ? "Хлопок" : "Cotton"}
                        </span>
                      </button>
                    </li>

                    <li style={{ marginBottom: "10px" }}>
                      <button
                        onClick={onClickCorn}
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          fontFamily: "Red Hat Display",
                          color: "white",
                        }}
                      >
                        {russian ? "Кукуруза" : "Corn"}
                      </button>
                    </li>

                    <li style={{ marginBottom: "10px" }}>
                      <button
                        onClick={onClickWheat}
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        {russian ? "Пшеница" : "Wheat"}
                      </button>
                    </li>
                    <li style={{ marginBottom: "10px" }}>
                      <button
                        onClick={onClickBarley}
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        {russian ? "Ячмень" : "Barley"}
                      </button>
                    </li>

                    <li style={{ marginBottom: "10px" }}>
                      <button
                        onClick={onClickAlfalfa}
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        {russian ? "Люцерна" : "Alfalfa"}
                      </button>
                    </li>

                    <li style={{ marginBottom: "10px" }}>
                      <button
                        onClick={onClickSunflower}
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        {russian ? "Подсолнечник" : "Sunflower"}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                color: "white",
                alignItems: "center",
                fontSize: "16px",
                paddingTop: "12px",
                paddingLeft: "9px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                  marginLeft: "8px",
                  fontSize: "12px",
                }}
              >
                <ImStack />
              </div>

              <span
                style={{
                  fontFamily: "Red Hat Display",
                  marginLeft: "8px",
                  marginBottom: "10px",
                  fontSize: "12px",
                }}
              >
                {russian ? "Параметры" : "Parameters"}
              </span>
            </div>

            {/* Parameters div */}

            <div
              style={{
                paddingLeft: "1rem",
                ...(isOpenPara
                  ? {
                      borderRadius: "25px",
                      overflow: "hidden",
                    }
                  : {
                      borderRadius: "40px",
                      overflow: "hidden",
                    }),
              }}
            >
              {/* Open Close */}

              <Button
                onClick={dropdownButtonPara}
                style={{
                  placeholder: "+sdfdf",
                  zIndex: 999,
                  display: "flex",
                  width: "270px",
                  margin: "4px",
                  fontSize: "12px",
                  padding: "5px",
                  borderRadius: "32px",
                  color: "rgba(255, 255, 255, 0.48)",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "Red Hat Display",
                  marginRight: "10px",
                  color: "rgba(255, 255, 255, 0.48)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  textTransform: "none",
                }}
              >
                <span style={{ marginLeft: "10px" }}>
                  {isOpenPara
                    ? selectedParameter
                      ? russian
                        ? Paratranslations[selectedParameter]?.ru
                        : Paratranslations[selectedParameter]?.en
                      : russian
                      ? "Выбрать параметр"
                      : "Select Parameter"
                    : selectedParameter
                    ? russian
                      ? Paratranslations[selectedParameter]?.ru
                      : Paratranslations[selectedParameter]?.en
                    : russian
                    ? "Выбрать параметр"
                    : "Select Parameter"}
                </span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3F4A57",
                    borderRadius: "50%",
                    width: "2rem",
                    height: "2rem",
                    cursor: "pointer",
                  }}
                >
                  {isOpenPara ? (
                    <BiUpArrowAlt style={{ color: "white" }} />
                  ) : (
                    <BiDownArrowAlt style={{ color: "white" }} />
                  )}
                </div>
              </Button>

              {isOpenPara && (
                <div className="dropdown">
                  <ul
                    style={{
                      listStyle: "none",
                      paddingLeft: "8px",
                      marginLeft: "10px",
                      marginBottom: "20px",
                      marginTop: "6px",
                    }}
                  >
                    <li style={{ marginBottom: "10px" }}>
                      <button
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          fontFamily: "Red Hat Display",
                          color: "white",
                        }}
                        onClick={onClickYield}
                      >
                        {russian ? "Урожайность" : "Crop Yield"}
                      </button>
                    </li>

                    <li style={{ marginBottom: "10px" }}>
                      <button
                        className="custom-button"
                        onClick={onClickET}
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        {russian ? "Эвапотранспирация" : "Evapotranspiration"}
                      </button>
                    </li>

                    <li style={{ marginBottom: "10px" }}>
                      <button
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                        onClick={onClickIWR}
                      >
                        {russian ? "Индекс водоресурсов" : "IWR"}
                      </button>
                    </li>

                    {/* {selectedCrop==="Sugarcane" && <li style={{ marginBottom: "10px" }}>
                      <button
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          borderRadius: 32,
                          background: sucroseActive ? "#4CB963" : "#1A2737",
                          color: "white",
                          fontFamily: "Red Hat Display",
                          justifyContent: "flex-start",
                        }}
                        onClick={onClickSucrose}
                      >
                        <span style={{ marginRight: "8px" }}>Sucrose</span>
                      </button>
                    </li>} */}

                    {/* <li style={{ marginBottom: "10px" }}>
                      <button
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: harvestActive ? "#4CB963" : "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          fontFamily: "Red Hat Display",
                          color: "white",
                        }}
                        onClick={onCickHarvestDate}
                      >
                        Harvest Date
                      </button>
                    </li> */}

                    <li style={{ marginBottom: "10px" }}>
                      <button
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                        onClick={onClickWaterProd}
                      >
                        {russian
                          ? "Водопроизводительность"
                          : "Water Productivity"}
                      </button>
                    </li>

                    <li style={{ marginBottom: "10px" }}>
                      <button
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                        onClick={onClickBiotic}
                      >
                        {russian ? "Водопроизводительность" : "Biotic Stress"}
                      </button>
                    </li>
                    {/* <li style={{ marginBottom: "10px" }}>
                      <button
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        Trees
                      </button>
                    </li>

                    <li style={{ marginBottom: "10px" }}>
                      <button
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        Forestry
                      </button>
                    </li>

                    <li style={{ marginBottom: "10px" }}>
                      <button
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        Flood
                      </button>
                    </li>

                    <li style={{ marginBottom: "10px" }}>
                      <button
                        className="custom-button"
                        style={{
                          zIndex: 999,
                          margin: "5px",
                          display: "flex",
                          background: "#1A2737",
                          border: "none",
                          borderRadius: 32,
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        Land Mass
                      </button>
                    </li> */}
                  </ul>
                </div>
              )}
            </div>
            <div>
              <div
                style={{
                  display: "flex",

                  paddingLeft: "9px",
                  color: "white",
                  alignItems: "center",
                  fontSize: "16px",
                  marginTop: "9px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "10px",
                    marginLeft: "8px",
                    fontSize: "12px",
                  }}
                >
                  <FaCalendar />
                </div>

                <span
                  style={{
                    fontFamily: "Red Hat Display",
                    marginLeft: "8px",
                    marginBottom: "10px",
                    fontSize: "12px",
                  }}
                >
                  {russian ? "Дата" : "Date"}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: "1rem",
                  padding: "0.5rem",
                  gap: "3rem",
                  // background: "red",
                }}
              >
                <div
                  style={{
                    marginLeft: "10px",
                    display: "flex",
                    color: "white",
                    fontSize: "11px",
                    justifyContent: "space",
                    alignItems: "center",
                    marginLeft: "10px",
                    textAlign: "left",
                    fontFamily: "Red Hat Display",
                    color: "rgba(255, 255, 255, 0.65)",
                    height: "1rem",
                  }}
                >
                  {russian ? "От" : "From"}
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        marginRight: "6px",
                        overflow: "hidden",
                        fontFamily: "Red Hat Display",
                        background: "yellow",
                        height: "0rem",
                        width: "0",
                      }}
                    >
                      {" "}
                      {/* Hide the input field */}
                      <DatePicker
                        className="datePickerStartDate"
                        selected={startDate}
                        onChange={handleStartDateChange}
                        showMonthDropdown
                        showYearDropdown
                        dateFormat="dd-MM-yyyy"
                        // filterDate={filter2023Dates}
                        locale={russian ? ru : undefined}
                      />
                    </div>

                    <p
                      onClick={() => {
                        document
                          .getElementsByClassName("datePickerStartDate")[0]
                          .click();
                      }}
                      style={{
                        marginRight: "6px",
                        fontSize: "10px",
                        fontFamily: "Red Hat Display",
                        marginTop: "11px",
                        color: "rgba(255, 255, 255)",
                        fontWeight: "300",
                      }}
                    >
                      {startDateString}{" "}
                      <span style={{ marginLeft: "4px" }}>
                        <DropDownIcon />
                      </span>
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    marginLeft: "10px",
                    display: "flex",
                    color: "white",
                    fontSize: "11px",
                    justifyContent: "space",
                    alignItems: "center",
                    marginLeft: "10px",
                    textAlign: "left",
                    fontFamily: "Red Hat Display",
                    color: "rgba(255, 255, 255, 0.65)",
                    height: "1rem",
                  }}
                >
                  {russian ? "До" : "To"}

                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        marginRight: "6px",
                        overflow: "hidden",
                        fontFamily: "Red Hat Display",
                        background: "yellow",
                        height: "0rem",
                        width: "0",
                      }}
                    >
                      {" "}
                      {/* Hide the input field */}
                      <DatePicker
                        className="datePickerEndDate"
                        selected={startDate}
                        onChange={handleEndDateChange}
                        showMonthDropdown
                        showYearDropdown
                        dateFormat="dd-MM-yyyy"
                        // filterDate={filter2023Dates}
                        locale={russian ? ru : undefined}
                      />
                    </div>

                    <p
                      onClick={() => {
                        document
                          .getElementsByClassName("datePickerEndDate")[0]
                          .click();
                      }}
                      style={{
                        marginRight: "6px",
                        fontSize: "10px",
                        fontFamily: "Red Hat Display",
                        marginTop: "11px",
                        color: "rgba(255, 255, 255)",
                        fontWeight: "300",
                      }}
                    >
                      {endDateString}{" "}
                      <span style={{ marginLeft: "4px" }}>
                        <DropDownIcon />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", paddingLeft: "0.2rem" }}>
              <Button
                onClick={continueButton}
                style={{
                  backgroundColor: "#4CD159",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "12px",
                  marginRight: "40px",
                  width: "270px",
                  height: "43px",
                  margin: "14px",
                  padding: "10px",
                  justifyContent: "flex-start",
                  fontFamily: "Red Hat Display",
                  cursor: "pointer",
                  textTransform: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {russian ? "Продолжить" : "Continue"}
                </Box>
              </Button>
            </div>
          </div>
        )}

        <div
          style={{
            zIndex: "999",
            display: "flex",
            color: "white",
            background: "#1A2737",
            position: "absolute",
            left: "42.8%",
            width: "200px",
            bottom: "0px",
            borderTopLeftRadius: "35px",
            borderTopRightRadius: "35px",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <div
            style={{
              fontFamily: "Red Hat Display",
              display: "flex",
              margin: "1px",
              padding: "1px",
            }}
          >
            {russian ? "Шир." : "Lat"}, {russian ? "Долг." : "Long"}:{" "}
            {latituteDisplay}, {longitudeDisplay}
          </div>

          <div
            style={{
              fontFamily: "Red Hat Display",
              display: "flex",
              margin: "1px",
              padding: "1px",
            }}
          ></div>
        </div>

        <div
          style={{
            zIndex: "999",
            display: "flex",
            flexFlow: "row",
            position: "absolute",
            right: "40px",
            width: "280px",
            bottom: "1px",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        ></div>

        {reportvisible && (
          <>
            {/* <Button
              onClick={handleDownload}
              style={{
                position: "absolute",
                width: 27,
                height: 48,
                right: 30,
                top: 60,
                zIndex: 999,
                backgroundColor: "#1A2737",
                color: "white",
                borderRadius: "16px",
                margin: "16px",
                border: "none",
              }}
            >
              <FaFileDownload size={15} />
            </Button> */}
            <GeoJSON
              key={JSON.stringify(geodata)}
              data={geodata}
              onEachFeature={onEachRoad}
            />
            <div
              style={{
                backgroundColor: "#1A2737",
                zIndex: "999",
                display: "flex",
                flexFlow: "column",
                position: "absolute",
                right: "30px",
                width: "300px",
                top: "300px",
                fontFamily: "Red Hat Display",
                borderRadius: "20px",
                padding: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexFlow: "row",
                  fontFamily: "Red Hat Display",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#1A273",
                    padding: "5px",
                    color: "white",
                    fontFamily: "Red Hat Display",
                  }}
                >
                  {russian ? "Отчет" : "REPORT"}
                </div>
                <button
                  style={{
                    zIndex: 999,
                    display: "flex",
                    background: "#1A2737",
                    color: "white",
                    margin: "10px",
                    borderRadius: "25px",
                    border: "none",
                    alignItems: "center",
                    position: "absolute",
                    right: "20px",
                    fontFamily: "Red Hat Display",
                  }}
                >
                  <GiWheat />
                  <span style={{ marginLeft: "8px" }}>
                    {russian
                      ? cropTranslations[selectedCrop]?.ru
                      : cropTranslations[selectedCrop]?.en}
                  </span>
                </button>
              </div>
              <div>
                {" "}
                <div>
                  {yieldActive && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#1A273",
                          padding: "5px",
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        <YieldIcon width="18" height="20" />
                        <span
                          style={{
                            marginLeft: "10px",
                            fontFamily: "Red Hat Display",
                          }}
                        >
                          {russian ? "Урожайность" : "Crop Yield"}
                        </span>

                        {!resultListClicked && (
                          <div
                            style={{
                              zIndex: 999,
                              display: "flex",
                              background: "rgba(26, 39, 55, 1",
                              // background: "red",
                              color: "white",
                              fontSize: "12px",
                              whiteSpace: "nowrap",
                              marginLeft: "20px",
                            }}
                          >
                            {formatDateReport(selectedDate)}
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#1A273",
                          padding: "5px",
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        {russian
                          ? `Средний урожай с вашего поля составляет ${meandata2} тонн/гектар`
                          : `The average crop yield from your field is ${meandata2} tons/hectare`}
                      </div>
                    </div>
                  )}
                  {sucroseActive && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#1A273",
                          padding: "5px",
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        <SucroseIcon width="18" height="20" />
                        <span
                          style={{
                            marginLeft: "10px",
                            fontFamily: "Red Hat Display",
                          }}
                        >
                          Sucrose
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#1A273",
                          padding: "5px",
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        The average sucrose in your field is {meandata2}%
                      </div>
                    </div>
                  )}

                  {waterProdActive && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#1A273",
                          padding: "5px",
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        <SucroseIcon width="18" height="20" />
                        <span
                          style={{
                            marginLeft: "10px",
                            fontFamily: "Red Hat Display",
                          }}
                        >
                          {russian
                            ? "Водопроизводительность"
                            : "Water Productivity"}
                        </span>
                        {!resultListClicked && (
                          <div
                            style={{
                              zIndex: 999,
                              display: "flex",
                              background: "rgba(26, 39, 55, 1",
                              // background: "red",
                              color: "white",
                              fontSize: "12px",
                              whiteSpace: "nowrap",
                              marginLeft: "20px",
                            }}
                          >
                            {formatDateReport(selectedDate)}
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#1A273",
                          padding: "5px",
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        {" "}
                        {russian
                          ? `Средняя водопроизводительность составляет ${meandata2} кг/м³`
                          : `The average Water Productivity is ${meandata2} kg/m³`}
                      </div>
                    </div>
                  )}

                  {bioticStressActive && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#1A273",
                          padding: "5px",
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        <SucroseIcon width="18" height="20" />
                        <span
                          style={{
                            marginLeft: "10px",
                            fontFamily: "Red Hat Display",
                          }}
                        >
                          {russian ? "Водопроизводительность" : "Biotic Stress"}
                        </span>
                        {!resultListClicked && (
                          <div
                            style={{
                              zIndex: 999,
                              display: "flex",
                              background: "rgba(26, 39, 55, 1",
                              // background: "red",
                              color: "white",
                              fontSize: "12px",
                              whiteSpace: "nowrap",
                              marginLeft: "20px",
                            }}
                          >
                            {formatDateReport(selectedDate)}
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#1A273",
                          padding: "5px",
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        {" "}
                        {russian
                          ? `Средняя водопроизводительность составляет ${meandata2} кг/м³`
                          : `The average Water Productivity is ${meandata2} kg/m³`}
                      </div>
                    </div>
                  )}

                  {harvestActive && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#1A273",
                          padding: "5px",
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        <HarvestDateIcon width="8px" height="8px" />
                        <span style={{ marginLeft: "10px" }}>Harvest Date</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#1A273",
                          padding: "5px",
                          color: "white",
                        }}
                      >
                        The crop can be scheduled to be harvested on{" "}
                        {meandata2.replace(/"/g, "")} to reach Optimal Maturity.
                      </div>
                    </div>
                  )}

                  {IWRActive && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#1A273",
                          padding: "5px",
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        <HarvestDateIcon width="18" height="20" />
                        <span
                          style={{
                            fontFamliy: "Red Hat Display",
                            marginLeft: "10px",
                          }}
                        >
                          {russian ? "Индекс водоресурсов" : "IWR"}
                        </span>
                        {!resultListClicked && (
                          <div
                            style={{
                              zIndex: 999,
                              display: "flex",
                              background: "rgba(26, 39, 55, 1",
                              // background: "red",
                              color: "white",
                              fontSize: "12px",
                              whiteSpace: "nowrap",
                              marginLeft: "20px",
                            }}
                          >
                            {formatDateReport(selectedDate)}
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#1A273",
                          padding: "5px",
                          color: "white",
                          fontFamily: "Red Hat Display",
                        }}
                      >
                        {parseFloat(meandata2) > 7 ? (
                          <p>
                            {russian
                              ? `Для оптимального орошения предоставьте вашему полю ${meandata2} мм воды`
                              : `For optimal irrigation, provide your field with ${meandata2} mm of water.`}
                          </p>
                        ) : (
                          <p>
                            {russian
                              ? `Орошение не требуется, ваши поля хорошо орошены`
                              : `No Irrigation required, your fields are well Irrigated.`}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {ETActive && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#1A273",
                          padding: "5px",
                          color: "white",
                        }}
                      >
                        <HarvestDateIcon width="18" height="20" />
                        <span
                          style={{
                            marginLeft: "10px",
                            fontFamily: "Red Hat Display",
                          }}
                        >
                          {russian ? "Эвапотранспирация" : "ET"}
                        </span>
                        {!resultListClicked && (
                          <div
                            style={{
                              zIndex: 999,
                              display: "flex",
                              background: "rgba(26, 39, 55, 1",
                              // background: "red",
                              color: "white",
                              fontSize: "12px",
                              whiteSpace: "nowrap",
                              marginLeft: "20px",
                            }}
                          >
                            {formatDateReport(selectedDate)}
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#1A273",
                          padding: "5px",
                          color: "white",
                          flexDirection: "column",
                          gap: "0.5rem",
                        }}
                      >
                        {russian
                          ? `Ваше поле имеет среднюю скорость испарения-транспирации `
                          : `Your field has an average Evapotranspiration rate of `}
                        {meandata2 && JSON.parse(meandata2).ET} mm
                        <div>
                          {russian
                            ? `Общее потребление воды в вашем районе составляет `
                            : `Total Water Consumed in your area is `}
                          {meandata2 && (
                            <>
                              {JSON.parse(meandata2).TWC.toFixed(2)}{" "}
                              {russian ? ` м³/день` : `m³/day`}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  backgroundColor: "#1A273",
                  padding: "5px",
                  color: "white",
                }}
              ></div>

              <DividerLineHorizontalIcon />
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#1A273",
                  padding: "5px",
                  color: "white",
                }}
              >
                <button
                  className="custom-button"
                  style={{
                    zIndex: 999,
                    display: "flex",
                    background: "#ffffff14",
                    border: "none",
                    color: "white",
                    margin: "10px",
                    borderRadius: "25px",
                    fontSize: "12px",
                  }}
                >
                  <DownloadIcon />

                  <span
                    onClick={handleDownload}
                    style={{
                      marginLeft: "8px",
                      fontFamily: "Red Hat Display",
                      fontSize: "12px",
                    }}
                  >
                    {!russian ? "GeoTiff" : "Геотиф"}
                  </span>
                </button>

                <button
                  className="custom-button"
                  style={{
                    zIndex: 999,
                    display: "flex",
                    background: "#ffffff14",
                    border: "none",
                    color: "white",
                    margin: "10px",
                    borderRadius: "25px",
                    fontSize: "12px",
                  }}
                >
                  <DownloadIcon />

                  <span
                    onClick={downloadJson}
                    style={{
                      marginLeft: "8px",
                      fontFamily: "Red Hat Display",
                      fontSize: "12px",
                    }}
                  >
                    {!russian ? "GeoJson" : "ГеоJSON"}
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </MapContainer>

      {isScriptExecuting && (
        <div
          style={{
            top: 39,
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            zIndex: 1000,
            background: "rgba(26, 39, 55, 1)",
            borderRadius: "12px",
            color: "white",
            width: russian ? 182 : 147,
            height: 42,
            whiteSpace: "nowrap",
            paddingTop: "5px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginLeft: "10px", fontSize: "13px" }}>
              {russian ? "Получение результатов" : "Fetching Results"}
            </p>
            <div style={{ marginLeft: "5px" }}>
              <RotatingLines
                strokeColor="#4CB963"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          width: 40,
          height: 48,
          right: 59,
          bottom: 38,
          zIndex: "1000",
        }}
      >
        {/* <img src="/kzk.jpeg" style={{ width: "70px", height: "70px" }} /> */}
      </div>

      {isdatefetching && (
        <div
          style={{
            top: 39,
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            zIndex: 1000,
            background: "rgba(26, 39, 55, 1)",
            borderRadius: "12px",
            color: "white",
            width: russian ? 137 : 142,
            height: 42,
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", margintop: "4px" }}
          >
            <p style={{ marginLeft: "10px", fontSize: "13px", color: "white" }}>
              {russian ? "Получение дат" : "Fetching Dates"}
            </p>
            <Comment
              visible={true}
              height="40"
              width="40"
              ariaLabel="comment-loading"
              wrapperStyle={{}}
              wrapperClass="comment-wrapper"
              color="#fff"
              backgroundColor="#4CB963"
            />
          </div>
        </div>
      )}

      {legendVisible && (
        <div>
          <ColorBar
            minValue={minValue}
            maxValue={maxValue}
            color={color}
            legendString={legendString}
          />
        </div>
      )}

      {secondcontainervisible && (
        // Second Container Div
        <div
          style={{
            backgroundColor: "#1A2737",
            zIndex: 2000,
            display: "flex",
            flexFlow: "column",
            position: "absolute",
            left: "28px",
            top: "80px",
            right: "100px",
            fontFamily: "Arial, sans-serif",
            borderRadius: "25px",
            alignItems: "flex-start",
            padding: "10px",
            width: "350px",
            height: "570px",
          }}
        >
          {/* First container */}
          <div
            style={{
              backgroundColor: "#2C3847",
              zIndex: 2000,
              display: "flex",
              flexFlow: "column",
              position: "absolute",
              left: "20px",
              top: "22px",
              right: "10px",
              fontFamily: "'Red Hat Display'",
              borderRadius: "16px",
              alignItems: "flex-start",
              padding: "10px",
              width: "310px",
              height: "62px",
            }}
          >
            {/* Go back button */}

            <button
              onClick={gobackbutton}
              style={{
                position: "absolute",
                width: 25,
                height: 25,
                left: -6,
                top: 19,
                zIndex: 999,
                backgroundColor: "#2C3847",
                color: "white",
                borderRadius: "90%",
                whiteSpace: "nowrap",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 10px 0 12px", // modified padding value
                fontSize: "14px",
                margin: "10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "55px",
                  height: "25px",
                  borderRadius: "50%",
                  backgroundColor: "#2C3847", // Adjust the background color of the circle
                  marginRight: "4px",
                }}
              >
                <AiOutlineLeft />
              </div>
            </button>

            {/* Location */}
            <TiChartArea
              style={{
                position: "absolute",
                left: "40px",
                top: "11px", // 60px (top of location div) + 19px (height of location div) + 10px (desired margin)
                display: "flex",
                flexDirection: "column",
                color: "#ABB0FF",
                fontSize: "13px",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "120px",
                height: "15px",
                left: "61px", // change the left and top to adjust the div position
                top: "9px", // placing it 60px from the top and 10px from the left
                fontFamily: "Red Hat Display",
                fontStyle: "normal",
                fontWeight: 300,
                fontSize: "13px",
                lineHeight: "19px",
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              {russian ? "Ордабасы" : "Sudus"}{" "}
            </div>

            {/* parameter icon */}
            <ImStack
              style={{
                position: "absolute",
                left: "40px",
                top: "50px", // 60px (top of location div) + 19px (height of location div) + 10px (desired margin)
                display: "flex",
                flexDirection: "column",
                color: "#ABB0FF",
                fontSize: "13px",
              }}
            />

            {/* parameter name */}
            <div
              style={{
                position: "absolute",
                width: "120px",
                height: "19px",
                left: "51px", // change the left and top to adjust the div position
                top: "48px", // placing it 60px from the top and 10px from the left
                fontFamily: "Red Hat Display",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "13px",
                lineHeight: "19px",
                color: "#FFFFFF",
                paddingLeft: "10px",
                fontWeight: 300,
              }}
            >
              {russian
                ? Paratranslations[selectedParameter]?.ru
                : Paratranslations[selectedParameter]?.en}
            </div>

            {/* polygon icon */}
            <SiGraphql
              style={{
                position: "absolute",
                left: "187px",
                top: "50px", // 60px (top of location div) + 19px (height of location div) + 10px (desired margin)
                display: "flex",
                flexDirection: "column",
                color: "#ABB0FF",
                paddingLeft: "10px",
                fontSize: "13px",
                fontWeight: 1300,
              }}
            />

            {/*Area Of Interest */}
            <div
              style={{
                position: "absolute",
                width: "120px",
                height: "19px",
                left: "210px", // change the left and top to adjust the div position
                top: "44px", // placing it 60px from the top and 10px from the left
                fontFamily: "Red Hat Display",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "19px",
                color: "#FFFFFF",
                paddingLeft: "10px",
                fontWeight: 100,
              }}
            >
              {areaOfPolygon} Km{" "}
              <sup
                style={{ fontWeight: 100, color: "#FFFFFF", fontSize: "12px" }}
              >
                2
              </sup>
            </div>

            <GiWheat
              style={{
                position: "absolute",
                left: "189px",
                top: "11px", // 60px (top of location div) + 19px (height of location div) + 10px (desired margin)
                display: "flex",
                flexDirection: "column",
                color: "#ABB0FF",
                paddingLeft: "10px",
                fontSize: "13px",
                fontWeight: 1300,
              }}
            />

            <div
              style={{
                position: "absolute",
                width: "120px",
                height: "15px",
                left: "210px", // change the left and top to adjust the div position
                top: "9px", // placing it 60px from the top and 10px from the left
                fontFamily: "Red Hat Display",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "13px",
                lineHeight: "19px",
                color: "#FFFFFF",
                paddingLeft: "10px",
                fontWeight: 100,
              }}
            >
              {russian
                ? cropTranslations[selectedCrop]?.ru
                : cropTranslations[selectedCrop]?.en}
            </div>
          </div>

          {/* cloud cover icon */}
          <BsFillCloudSunFill
            style={{
              position: "absolute",
              left: "30px",
              top: "130px", // 60px (top of location div) + 19px (height of location div) + 10px (desired margin)
              display: "flex",
              flexDirection: "column",
              color: "#FFFFFF",
              fontSize: "13px",
            }}
          />

          {/* cloud cover text */}
          <div
            style={{
              position: "absolute",
              width: "120px",
              height: "19px",
              left: "59px", // change the left and top to adjust the div position
              top: "132px", // placing it 60px from the top and 10px from the left
              fontFamily: "Red Hat Display",
              fontStyle: "normal",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "19px",
              color: "#FFFFFF",
            }}
          >
            {russian ? "Область облачности" : "Cloud Coverage"}
          </div>

          {/* Cloud Cover Slider */}

          <DiscreteSliderr setMainSliderValue={setMainSliderValue} />

          {/* Calender text  */}
          {/* <div
            style={{
              position: "absolute",
              width: "120px",
              height: "19px",
              left: "59px", // change the left and top to adjust the div position
              top: "202px", // placing it 60px from the top and 10px from the left
              fontFamily: "Red Hat Display",
              fontStyle: "normal",
              fontWeight: 500,
              fontSize: "13px",
              lineHeight: "19px",
              color: "#FFFFFF",
            }}
          >
            Calendar
          </div> */}

          {/* Calender icon  */}
          {/* <CiCalendar
            style={{
              position: "absolute",
              left: "30px",
              top: "200px", // 60px (top of location div) + 19px (height of location div) + 10px (desired margin)
              display: "flex",
              flexDirection: "column",
              color: "#FFFFFF",
              fontSize: "20px",
            }}
          /> */}

          {/* Actual Calendar  */}
          <div
            className="myCalendar"
            style={{
              backgroundColor: "#1A2737",
              zIndex: 2000,
              display: "flex",
              flexFlow: "column",
              position: "absolute",
              left: "25px",
              top: "210px",
              right: "100px",
              fontFamily: "Red Hat Display",
              borderRadius: "25px",
              alignItems: "flex-start",
              padding: "10px",
              width: "300px",
              height: "200px",
            }}
          >
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileClassName={dateIsHighlighted(mainSliderValue)}
            />
          </div>

          {/*Generate button */}
          <button
            onClick={generatebutton}
            style={{
              position: "absolute",
              backgroundColor: "#4CD159",
              borderRadius: "10px",
              color: "white",
              fontSize: "12px",
              width: "270px",
              height: "43px",
              margin: "14px",
              padding: "10px",
              top: "515px", // Adjust this value to position the button below the calendar
              left: "34px", // Align the button with the calendar and the div
              justifyContent: "flex-start",
              fontFamily: "Red Hat Display",
              cursor: "pointer",
              textTransform: "none",
            }}
          >
            {russian ? "Создать" : "Generate"}{" "}
          </button>
        </div>
      )}

      <div
        onClick={demobutton}
        style={{
          position: "absolute",
          width: 47,
          height: 48,
          left: 20,
          top: 4,
          zIndex: 999,
          backgroundColor: !democlicked ? "#1A2737" : "rgba(76, 84, 209, 1)",
          color: "white",
          borderRadius: "16px",
          whiteSpace: "nowrap",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 12px 0 12px", // modified padding value
          fontSize: "19px",
          margin: "10px",
          border: "none",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >
        {russian ? "Демо" : "Demo"}
      </div>

      <div
        onClick={resultListButton}
        style={{
          position: "absolute",
          width: 47,
          height: 48,
          left: 100,
          top: 4,
          zIndex: 999,
          backgroundColor: !resultListClicked
            ? "#1A2737"
            : "rgba(76, 84, 209, 1)",
          color: "white",
          borderRadius: "16px",
          whiteSpace: "nowrap",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 12px 0 12px",
          fontSize: "14px",
          margin: "10px",
          border: "none",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >
        {russian ? "Результаты" : "Results"}
        {/* <FaCoins /> */}
      </div>

      <Button
        onClick={toggleMaptype}
        style={{
          position: "absolute",
          width: 20,
          height: 48,
          right: 20,
          top: 4,
          zIndex: 999,
          backgroundColor: !maptype ? "#1A2737" : "rgba(76, 84, 209, 1)",
          color: "white",
          borderRadius: "16px",
          margin: "10px",
          border: "none",
          fontSize: "12px",
        }}
      >
        <BlocksIcon />
      </Button>
    </>
  );
};

export default MainPage;
