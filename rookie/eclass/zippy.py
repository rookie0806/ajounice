import os
import zipfile
from shutil import make_archive

def makezip(filename, root):
    make_archive(filename, 'zip', root_dir=root)
    print("zip complete")
