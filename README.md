# Windows Steps Recorder MHT to HTML Updater 
A simple webapp that converts the MHT files produced by Windows Steps Recorder into modern HTML files.

## Background
The [Windows Steps Recorder](https://support.microsoft.com/en-us/windows/record-steps-to-reproduce-a-problem-46582a9b-620f-2e36-00c9-04e25d784e47) can be used to record the actions taken on your computer, generally for providing troubleshooting steps to a third party (e.g. via the Microsoft Forums). 

This program is relatively old, and generates files in the [MHT file format](https://en.wikipedia.org/wiki/MHTML), which is a _"web page archive format used to combine, in a single computer file, the HTML code and its companion resources (such as images, Flash animations, Java applets, and audio and video files) that are represented by external hyperlinks in the web page's HTML code_". 

This filetype is weird, and barely supported outside of Internet Explorer. Unfortunately for us, [Internet Explorer is now officially dead](https://blogs.windows.com/windowsexperience/2022/06/15/internet-explorer-11-has-retired-and-is-officially-out-of-support-what-you-need-to-know/), meaning that the only "easy" way to view the output of Steps Recorder is to use [IE Mode in Edge](https://docs.microsoft.com/en-us/deployedge/edge-ie-mode). 

## The Converter
This webapp converts a Steps Recorder MHT file into a valid HTML document. Please keep in mind that this solution is designed to convert Steps Recorder MHT files **only**. Other MHT files **will not work**. 

To use, simply select your MHT file in your browser's file menu, and the converted HTML document will be downloaded automatically. 

You can see how the same document looks in Chrome v100 from the below screenshots (Click on the image to enlarge!):

| Before | After |
|--|--|
| [![Original MHT file being viewed in Chrome Version 100, with no CSS or images](https://i.imgur.com/VXo7ktH.png)](https://i.imgur.com/VXo7ktH.png) | [![Converted HTMK file being viewed in Chrome Version 100, with CSS and images both present](https://i.imgur.com/91GhAzq.png]([https://i.imgur.com/91GhAzq.png](https://i.imgur.com/91GhAzq.png)))](https://i.imgur.com/91GhAzq.png) |

## Issues or Suggestions? 
Please feel free to raise an issue or a pull request! 
