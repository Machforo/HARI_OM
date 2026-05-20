# Adding Video Background to Hero Banner

## Instructions

1. **Prepare your video file:**
   - Recommended format: MP4 with H.264 video codec
   - Recommended resolution: 1920x1080 or 1280x720
   - Recommended file size: Under 10MB for fast loading (use compression tools)
   - Aspect ratio: 16:9 (landscape)
   - Duration: 6-10 seconds (looping video)

2. **Place the video file:**
   - Add your video to `/src/assets/` folder
   - Example: `hero-darshan.mp4`

3. **Update Index.tsx:**
   - Import the video: `import heroBannerVideo from "@/assets/hero-darshan.mp4";`
   - Pass it to HeroBanner component:
   ```tsx
   <HeroBanner 
     videoSrc={heroBannerVideo}
     imageSrc={hero}
     imageAlt="Devotees doing darshan"
   >
     {/* Your banner content */}
   </HeroBanner>
   ```

## Video Content Ideas

The video should showcase:
- Devotees performing darshan/worshiping at temples
- Priests performing pujas with diyas and flowers
- Temple bells and rituals
- Devotees lighting lamps (diyas)
- Flower offerings
- Sacred moments of prayer
- Circumambulation (pradakshina) around temples

## Performance Tips

- Keep video under 5 seconds for optimal loading
- Use online compression tools (HandBrake, FFmpeg)
- Test on various devices and browsers
- The video will automatically fall back to image if not supported

## Browser Compatibility

- Modern browsers support autoplay with muted videos
- iOS Safari requires user interaction (muted videos auto-play)
- Video will show silently without affecting user experience
