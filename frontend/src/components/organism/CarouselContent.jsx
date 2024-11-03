// 3rd party
import { useState } from "react";
import { Carousel, Image } from "react-bootstrap";

// atomic design
import { labeled, message, spinner } from "../atom";

// custom hooks and assets
import useFetch from "../../hooks/useFetch";
import picture from "../../assets/images/default_carousel_image.png";

// styling
import styles from "../../styles/components/organism/Carousel.module.css";

const CarouselContent = () => {
  const { data } = useFetch("");
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={styles.carouselContainer}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {data ? (
          data.length > 0 ? (
            data.map(({ id, image, price, description, address }) => (
              <Carousel.Item key={id}>
                <Image src={image} className={styles.image} />
                <Carousel.Caption className={styles.carouselCaption}>
                  {labeled(`£${price} per month`)}
                  {message(description)}
                  {message(address)}
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : (
            <Carousel.Item key="1">
              <Image key={index} src={`${picture}`} className={styles.image} />
              <Carousel.Caption className={styles.carouselCaption}>
                {labeled("There is no Properties to display yet?")}
              </Carousel.Caption>
            </Carousel.Item>
          )
        ) : (
          spinner()
        )}
      </Carousel>
    </div>
  );
};

export default CarouselContent;
