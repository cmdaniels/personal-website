import urllib.request
import os
import subprocess
import wave
import struct

birds = {
    'robin': {'xcid': '13649', 'duration': 3.5},
    'sparrow': {'xcid': '99572', 'duration': 4.2},
    'chickadee': {'xcid': '109595', 'duration': 2.8},
    'jay': {'xcid': '109654', 'duration': 2.5},
    'junco': {'xcid': '142588', 'duration': 3.0}
}

dest_dir = "files/audio"
os.makedirs(dest_dir, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

print("Bird Bioacoustics Audio Downloader & Trimmer")
print("============================================")

for name, info in birds.items():
    xcid = info['xcid']
    duration = info['duration']
    
    mp3_path = f"temp_{name}.mp3"
    wav_path = f"temp_{name}.wav"
    output_wav = os.path.join(dest_dir, f"{name}.wav")
    
    print(f"\nProcessing {name} (XC {xcid})...")
    
    # 1. Download original MP3
    url = f"https://xeno-canto.org/{xcid}/download"
    print(f"  Downloading from {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            with open(mp3_path, 'wb') as f:
                f.write(response.read())
        print(f"  Downloaded temp MP3 ({os.path.getsize(mp3_path)} bytes)")
    except Exception as e:
        print(f"  FAILED to download: {e}")
        continue

    # 2. Convert to mono WAV at 22050Hz
    print("  Converting MP3 to WAV using afconvert...")
    try:
        # -f WAVE: output file format is WAVE
        # -d LEI16@22050: 16-bit Little Endian Integer mono @ 22050Hz
        # -c 1: mono
        subprocess.run([
            "afconvert", 
            "-f", "WAVE", 
            "-d", "LEI16@22050", 
            "-c", "1", 
            mp3_path, 
            wav_path
        ], check=True)
    except Exception as e:
        print(f"  FAILED to convert to WAV: {e}")
        if os.path.exists(mp3_path): os.remove(mp3_path)
        continue

    # 3. Read WAV and detect onset (start of bird call)
    print("  Detecting audio onset...")
    try:
        with wave.open(wav_path, 'rb') as w:
            params = w.getparams()
            n_frames = w.getnframes()
            sample_rate = w.getframerate()
            
            # Read all frames as shorts (16-bit)
            frames = w.readframes(n_frames)
            samples = struct.unpack(f"<{n_frames}h", frames)
            
            # Find root-mean-square (RMS) in 50ms windows to detect onset
            window_size = int(sample_rate * 0.05) # 50ms window
            max_rms = 0
            window_rms = []
            
            # Calculate RMS for all windows
            for i in range(0, len(samples) - window_size, window_size):
                window = samples[i:i+window_size]
                rms = (sum(s*s for s in window) / window_size) ** 0.5
                window_rms.append((i, rms))
                if rms > max_rms:
                    max_rms = rms
            
            # Set onset threshold to 12% of maximum RMS
            threshold = max_rms * 0.12
            onset_index = 0
            for idx, rms in window_rms:
                if rms > threshold:
                    # Found onset! Let's go back 100ms (buffer) to avoid cutting the note start
                    onset_index = max(0, idx - int(sample_rate * 0.1))
                    break
            
            onset_time = onset_index / sample_rate
            print(f"  Detected bird call onset at {onset_time:.2f}s (Max RMS: {max_rms:.1f}, Threshold: {threshold:.1f})")
            
            # 4. Extract segment
            start_frame = onset_index
            end_frame = min(n_frames, start_frame + int(sample_rate * duration))
            
            trimmed_samples = samples[start_frame:end_frame]
            
            # 5. Write trimmed WAV
            print(f"  Saving trimmed WAV to {output_wav} ({duration}s)...")
            with wave.open(output_wav, 'wb') as out_w:
                out_w.setnchannels(1)
                out_w.setsampwidth(2) # 16-bit
                out_w.setframerate(sample_rate)
                out_w.writeframes(struct.pack(f"<{len(trimmed_samples)}h", *trimmed_samples))
                
        print(f"  SUCCESS! Created {output_wav} ({os.path.getsize(output_wav)} bytes)")
    except Exception as e:
        print(f"  FAILED to process audio: {e}")
    finally:
        # Clean up temp files
        if os.path.exists(mp3_path): os.remove(mp3_path)
        if os.path.exists(wav_path): os.remove(wav_path)

print("\nAll done!")
