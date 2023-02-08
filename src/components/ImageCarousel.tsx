import React, { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Carousel from "pinar";

const ImageCarousel: FC<any> = ({ media }) => {
    return <View style={styles.carouselContainer}>
        <Carousel showsDots={false}>
            {media.map((item: any) =>
            (
                <Image
                    key={item.url} source={{ uri: item.url }}
                    style={styles.carouselImage}

                />
            )
            )}
        </Carousel>
    </View>
}


const styles = StyleSheet.create({
    carouselImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    carouselContainer: {
        height: 300,
        padding: 10
    }

})

export default ImageCarousel;