import Image from 'next/image'
import React from 'react'

import { Container, Grid, GridCol, SimpleGrid, Skeleton, rem } from '@mantine/core';

interface ImageGridProps {
    images: string[],
    spotName: string
}

const ImageGrid = ({
    images,
    spotName
}:ImageGridProps) => {
    const PRIMARY_COL_HEIGHT = rem(300);
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

    // if (images.length < 5) {
        return (
            <div>
                <div className="sm:hidden">
                <Container my="md" fluid>
                <SimpleGrid 
                    cols={1} 
                    spacing="md">
                    <div style={{ height: PRIMARY_COL_HEIGHT, position: 'relative' }}>
                        <Image
                            src={images[0]}
                            alt={`image-1`}
                            fill
                            style={{ borderRadius: 'var(--mantine-radius-md)', objectFit: "cover" }}
                        />
                    </div>
                </SimpleGrid>
                </Container>
                </div>
                <div className="hidden sm:block">
                <Container my="md" fluid>
                <SimpleGrid 
                    cols={images.length} 
                    spacing="md">
                    {images.slice(0).map((src, index) => (
                        <div key={index} style={{ height: PRIMARY_COL_HEIGHT, position: 'relative' }}>
                            <Image
                                src={src}
                                alt={`image-${index}`}
                                fill
                                style={{ borderRadius: 'var(--mantine-radius-md)', objectFit: "cover" }}
                            />
                        </div>
                    ))}
                </SimpleGrid>
                </Container>
                </div>
            </div>
        )
    // }

//   return (
//     <div>
//     <Container my="md">
//         <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
//         <Image
//             src={images[0]}
//             alt={`${spotName}-0`}
//             fill
//             style={{ borderRadius: 'var(--mantine-radius-md)', objectFit: "cover" }}
//          />
//         <Grid gutter="md">
//             {images.slice(1, 4).map((src, index) => (
//                     <Grid.Col key={index} span={6}>
//                         <div style={{ height: SECONDARY_COL_HEIGHT, position: 'relative' }}>
//                         <Image
//                             width={240}
//                             height={240}
//                             objectFit="cover"
//                             alt={`${spotName}-${index + 1}`}
//                             src={src}
//                         />
//                         </div>
//                     </Grid.Col>
//                 ))}
//         </Grid>
//         </SimpleGrid>
//     </Container>
//   </div>
//   )
}

export default ImageGrid