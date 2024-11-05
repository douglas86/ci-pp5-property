// 3rd party
import { useState } from "react";
import { Carousel, Image } from "react-bootstrap";

// atomic design
import { labeled, message } from "../atom";

// custom hooks and assets
import useFetch from "../../hooks/useFetch";
import picture from "../../assets/images/default_carousel_image.png";

// styling
import styles from "../../styles/components/organism/Carousel.module.css";

/**
 * Organism for handling the carousel
 * @returns {JSX.Element}
 * @constructor
 */
const CarouselContent = () => {
  // fetching data from server
  const { data } = useFetch("");

  // state for keeping track of what carousel is being displayed
  const [index, setIndex] = useState(0);

  // handling the left and right select buttons
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={styles.carouselContainer}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {data ? (
          // display carousel when there is data from a database
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
            // when no data show only this image
            <Carousel.Item key="1">
              <Image key={index} src={`${picture}`} className={styles.image} />
              <Carousel.Caption className={styles.carouselCaption}>
                {labeled("There is no Properties to display yet?")}
              </Carousel.Caption>
            </Carousel.Item>
          )
        ) : (
          // while waiting for data, show only this image
          <Carousel.Item key="1">
            <Image key={index} src={`${picture}`} className={styles.image} />
            <Carousel.Caption className={styles.carouselCaption}>
              {labeled("There is no Properties to display yet?")}
            </Carousel.Caption>
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
};

export default CarouselContent;
