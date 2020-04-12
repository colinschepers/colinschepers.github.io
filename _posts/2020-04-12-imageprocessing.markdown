---
layout: post
title:  "Take a look at image processing!"
date:   2020-04-12 10:10:31 +0100
categories: [AI, ImageProcessing, JavaScript]
tags: [AI, ImageProcessing, JavaScript, p5.js]
--- 
Everyone reading this has proably opened Photoshop at least once. Ever wondered how the filters works? This application demonstrates several relatively simple image processing techniques.

<p><div style="text-align:center;"><iframe src="https://colinschepers.github.io/ImageProcessing/" width="650pt" height="430pt"></iframe></div></p>

## Techniques

### Kernels

A kernel is a small matrix used in image processing to apply effects like blurring, sharpening, embossing, edge detection, etc. During a so called convolution between a kernel and an image, the local neighbours of each pixel in the image are being added using the weights of the kernel [1, 2].  

The kernel used for blurring in the application is using a Gaussian distribution in two dimensional space [3]. Given a kernel size and a standard deviation, the Gaussian function determines the weight of the neighbouring pixel. An approximation of a Gaussian blur filter of size 3 is given below. The kernels for sharpening, edge detection and embossing are also displayed below. 

	                          [ 1 2 1 ]                          [  0 -1  0 ]
	     Gaussian blur = 1/16 [ 2 4 2 ]              Sharpen =   [ -1  5 -1 ]
	                          [ 1 2 1 ]                          [  0 -1  0 ]

	                         [ -1 -1 -1 ]                        [ -2 -1  0 ]
	     Edge Detection =    [ -1  8 -1 ]            Emboss =    [ -1  1  1 ]
	                         [ -1 -1 -1 ]                        [  0  1  2 ]
						  
Note that the application only uses one dimensional arrays but for visualization purposes the kernels above are displayed in a two dimensional array.

### Color Quantization

Median cut color quantization is the process that reduces the number of distinct colors in an image [4]. This is done by splitting the pixels of the images *n* times, producing *n&sup2;* distinct colors. At each iteration pixels are sorted by the color channel with the greatest range and then split at the middle into two new buckets. Finally, for each of the generated buckets, the pixels are assigned to their mean color. The application uses a one dimensional array of pixel indices and a queue to recursively generate the buckets.

### Interpolation

A common technique used to upscale or downscale an image is nearest neighbor interpolation [5, 6]. The application demonstrates this with an effect that causes pixels to because enlarged, i.e. it looks like pixels are larger while in fact the image is exactly the same resolution. Given a scaling parameter, each new pixel is assigned the color of the nearest neighbor in the oiginal picture.

## Graphical User Interface

The user interface shows by default a beautiful picture of cats, but the user is able to drag an image file onto the canvas to use a custom picture. The menu on the bottom contains buttons to apply filters to the image. Go ahead and press them (multiple times) to see some cool results!

## Implementation

This fully front-end based application is written in JavaScript (besides some basic *html* and *css*) and the visualization is done using the *p5.js* library [7]. No external image processing libraries were used.

## Sources

1. [https://en.wikipedia.org/wiki/Kernel_(image_processing)](https://en.wikipedia.org/wiki/Kernel_(image_processing))
2. [https://setosa.io/ev/image-kernels](https://setosa.io/ev/image-kernels)
3. [https://homepages.inf.ed.ac.uk/rbf/HIPR2/gsmooth.htm](https://homepages.inf.ed.ac.uk/rbf/HIPR2/gsmooth.htm)
4. [https://muthu.co/reducing-the-number-of-colors-of-an-image-using-median-cut-algorithm](https://muthu.co/reducing-the-number-of-colors-of-an-image-using-median-cut-algorithm)
5. [https://theailearner.com/2018/12/29/image-processing-nearest-neighbour-interpolation](https://theailearner.com/2018/12/29/image-processing-nearest-neighbour-interpolation)
6. [http://tech-algorithm.com/articles/nearest-neighbor-image-scaling](http://tech-algorithm.com/articles/nearest-neighbor-image-scaling)
7. [https://p5js.org](https://p5js.org)