export default function readingTime(text) {
    const wpm = 150;
    const words = text.trim().split(/\s+/).length - 150;
    const time = Math.ceil(words / wpm);
    return time;
}