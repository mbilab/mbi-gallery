#MBI-Gallery jquery Plugin#
##Features##
What this plugin can do is:

* Auto fetch for images in a given folder and insert them into the given element
* Resize the images to fit in the element when image loading or window resizing
* Enable simple animation with image descriptions with a given txt file

##Options##

###photoFolderUrl###
The address of the folder containing the images been put in the div 
###descriptionUrl###
The address of the txt file that contains the image and its description

Format

    [image1 file name] [description1]
	[image2 file name] [description2]
    ...
		    
    example:
    mg1.JPG SomeDescription
    mg2.JPG SomeDescription
(This version might not be able to handle the description that contains whitespace)

###numLoadingImg###
The number of images will be loaded into the element of the site
-1 means all image in the folder will be loaded
(Default option:-1)

###imgInitialHeight###
The initial height of the image before resize
Larger height means lesser images per row

###animateSpeed###
Speed of the animate
