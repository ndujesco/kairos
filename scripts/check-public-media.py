"""Prevent publishing native presentation movies or pitch video binaries."""
from pathlib import Path
from zipfile import ZipFile

PUBLIC = Path(__file__).resolve().parents[1] / 'public'
VIDEO = {'.mp4', '.mov', '.m4v', '.webm', '.avi', '.wmv', '.mkv'}
bad = []
for path in PUBLIC.rglob('*'):
    if not path.is_file(): continue
    if path.suffix.lower() in {'.pptx', '.key'}:
        with ZipFile(path) as package:
            if any(Path(name).suffix.lower() in VIDEO for name in package.namelist()):
                bad.append(str(path.relative_to(PUBLIC)))
    if path.suffix.lower() in VIDEO and path.is_relative_to(PUBLIC / 'pitch-assets'):
        bad.append(str(path.relative_to(PUBLIC)))
if bad:
    raise SystemExit('Preserve these movies in the Kairos Drive archive, outside public:\n' + '\n'.join(bad))
print('Public presentation media check passed.')
