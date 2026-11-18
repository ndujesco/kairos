# Default face-check media

Updated 18 November 2026 for the Omohuma (Miracle) Cleva demo.

Source: `/Users/ndujekwuugochukwu/Downloads/IMG_2444.mov` (54,593,117 bytes, 6.798 seconds). The source is preserved; only the prepared copies are silent.

Source SHA-256: `d56eb946e237d668ab3e556e46d19984ffaf85f68de2992ba0d735ee7c8571f5`.

| App asset | Encoding | Size | Duration | Audio |
| --- | --- | ---: | ---: | --- |
| `public/demo/face-check.mp4` | h264, 480×854, 24 fps, yuv420p | 614,814 bytes | 6.792 s | None |
| `public/demo/face-check.webm` | vp9, 480×854, 24 fps, yuv420p | 905,180 bytes | 6.792 s | None |

Preparation uses FFmpeg auto-rotation, `fps=24,scale=480:-2:flags=lanczos,setsar=1`, video-only mapping, `-an -sn -dn -map_metadata -1 -map_chapters -1`. MP4: `libx264`, CRF 27, medium preset and `+faststart`. WebM: `libvpx-vp9`, CRF 36, zero target bitrate, good deadline, cpu-used 2 and row-mt 1. No trimming, speed change or face alteration.

Both formats fully decode and contain one video stream with no audio or data tracks. Rotation is baked into upright portrait pixels; source location and creation metadata are absent. MP4 moov metadata precedes media data for fast playback.

`CreateWizard.tsx` requests both assets with `?v=omohuma-20261118` so browsers fetch the new capture. The clip remains unmounted until complete NIN + Start; the 600 ms camera-opening state and video-independent verification/publishing deadlines are unchanged.

The Cleva Grand Finale folder also has `face-check-omohuma.mp4` for the next recording. Existing full demo recordings, their transcripts and native decks remain historical; no full walkthrough was re-recorded by this update.
