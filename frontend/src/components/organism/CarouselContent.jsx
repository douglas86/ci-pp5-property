import { useState } from "react";
import { Carousel } from "react-bootstrap";

import first from "../../assets/images/carousel/one.jpg";
import second from "../../assets/images/carousel/two.jpg";
import third from "../../assets/images/carousel/three.jpg";

import styles from "../../styles/components/organism/Carousel.module.css";
import Image from "react-bootstrap/Image";
import { labeled, message } from "../atom";

const CarouselContent = ({ data }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const arr = [
    {
      id: 1,
      image: first,
      label: "£1200 per month",
      paragraph: "2 bedroom flat for sale",
      place: "Palmer House, Fulham W6",
    },
    {
      id: 2,
      image: second,
      label: "£1000 per month",
      paragraph: "1 bedroom apartment for sale",
      place: "The Welsh Reservoir, Hendon NW9",
    },
    {
      id: 3,
      image: third,
      label: "£1600 per month",
      paragraph: "1 bedroom penthouse for sale",
      place: "Egerton Road, Twickenham TW2",
    },
  ];

  return (
    <div className={styles.carouselContainer}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {arr.map(({ id, image, label, paragraph, place }) => (
          <Carousel.Item key={id}>
            <div className={styles.imageContainer}></div>
            <Image
              src={`${image}`}
              alt={label}
              className={styles.image}
              rounded
            />
            <Carousel.Caption className={styles.carouselCaption}>
              {labeled(label)}
              {message(paragraph)}
              {message(place)}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselContent;
