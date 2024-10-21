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
      label: "Redhill",
      paragraph: "Nice cottage located 10min walk from Redhill train station",
    },
    {
      id: 2,
      image: second,
      label: "Redhill",
      paragraph: "Nice cottage located 10min walk from Redhill train station",
    },
    {
      id: 3,
      image: third,
      label: "Redhill",
      paragraph: "Nice cottage located 10min walk from Redhill train station",
    },
  ];

  return (
    <div className={styles.carouselContainer}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {arr.map(({ id, image, label, paragraph }) => (
          <Carousel.Item key={id}>
            <div className={styles.imageContainer}></div>
            <Image
              src={`${image}`}
              alt={label}
              className={styles.image}
              rounded
            />
            <Carousel.Caption>
              {labeled(label)}
              {message(paragraph)}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselContent;
