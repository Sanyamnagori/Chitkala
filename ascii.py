import cv2
import numpy as np

def print_ascii(img_path):
    print("IMAGE:", img_path)
    img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print("Not found")
        return
    h, w = img.shape[:2]
    out_w = 80
    out_h = int(h / w * out_w * 0.5)
    resized = cv2.resize(img, (out_w, out_h))
    
    # Use alpha channel if available, else convert to gray and threshold
    if img.shape[2] == 4:
        alpha = resized[:, :, 3]
    else:
        gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
        alpha = 255 - gray # assuming white background

    chars = ' .:-=+*#%@'
    res = ''
    
    # Print column ruler (tens)
    res += '    '
    for x in range(out_w):
        if x % 10 == 0:
            res += str(x//10)
        else:
            res += ' '
    res += '\n'
    
    # Print column ruler (units)
    res += '    '
    for x in range(out_w):
        res += str(x%10)
    res += '\n'

    for y in range(out_h):
        res += f"{y:02d} |"
        for x in range(out_w):
            val = alpha[y, x]
            idx = int(val / 256 * len(chars))
            res += chars[idx]
        res += '|\n'
    print(res)

print_ascii('public/images/face-top-left.png')
print_ascii('public/images/face-bottom-left-107a4b.png')
# print_ascii('public/images/face-top-right.png')
# print_ascii('public/images/face-bottom-right.png')
