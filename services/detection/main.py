import os
import pathlib
import argparse

import numpy as np
import six.moves.urllib as urllib
import sys
import tarfile
import tensorflow as tf
import zipfile

from collections import defaultdict
from io import StringIO
# from matplotlib import pyplot as plt
from PIL import Image
from IPython.display import display

from object_detection.utils import ops as utils_ops
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as vis_util

# patch tf1 into `utils.ops`
utils_ops.tf = tf.compat.v1

# Patch the location of gfile
tf.gfile = tf.io.gfile

FLAGS = None
category_index = None
TEST_IMAGE_PATHS = None


def ensure_dir(file_path):
    directory = os.path.dirname(file_path)
    if not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)

def set_config():
    # print(FLAGS)
    global CONFIG
    CONFIG = {
                "PATH_TO_LABELS": FLAGS.PATH_TO_LABELS,
                "TEST_IMAGES_DIR": FLAGS.TEST_IMAGES_DIR                               
             }

def load_model(model_name):
  base_url = 'http://download.tensorflow.org/models/object_detection/'
  model_file = model_name + '.tar.gz'
  model_dir = tf.keras.utils.get_file(
    fname=model_name, 
    origin=base_url + model_file,
    untar=True)

  model_dir = pathlib.Path(model_dir)/"saved_model"
  model = tf.saved_model.load(str(model_dir))
  return model

def run_inference_for_single_image(model, image):
  image = np.asarray(image)
  # The input needs to be a tensor, convert it using `tf.convert_to_tensor`.
  input_tensor = tf.convert_to_tensor(image)
  # The model expects a batch of images, so add an axis with `tf.newaxis`.
  input_tensor = input_tensor[tf.newaxis,...]

  # Run inference
  model_fn = model.signatures['serving_default']
  output_dict = model_fn(input_tensor)

  # All outputs are batches tensors.
  # Convert to numpy arrays, and take index [0] to remove the batch dimension.
  # We're only interested in the first num_detections.
  num_detections = int(output_dict.pop('num_detections'))
  output_dict = {key:value[0, :num_detections].numpy() 
                 for key,value in output_dict.items()}
  output_dict['num_detections'] = num_detections

  # detection_classes should be ints.
  output_dict['detection_classes'] = output_dict['detection_classes'].astype(np.int64)
   
  # Handle models with masks:
  if 'detection_masks' in output_dict:
    # Reframe the the bbox mask to the image size.
    detection_masks_reframed = utils_ops.reframe_box_masks_to_image_masks(
              output_dict['detection_masks'], output_dict['detection_boxes'],
               image.shape[0], image.shape[1])      
    detection_masks_reframed = tf.cast(detection_masks_reframed > 0.5,
                                       tf.uint8)
    output_dict['detection_masks_reframed'] = detection_masks_reframed.numpy()
    
  return output_dict

def show_inference(model, image_path):
  # the array based representation of the image will be used later in order to prepare the
  # result image with boxes and labels on it.
  image_np = np.array(Image.open(image_path))
  # Actual detection.
  output_dict = run_inference_for_single_image(model, image_np)
  print(output_dict)
#   category_index = label_map_util.create_category_index_from_labelmap(CONFIG['PATH_TO_LABELS'], use_display_name=True)
  # Visualization of the results of a detection.
#   vis_util.visualize_boxes_and_labels_on_image_array(
#       image_np,
#       output_dict['detection_boxes'],
#       output_dict['detection_classes'],
#       output_dict['detection_scores'],
#       category_index,
#       instance_masks=output_dict.get('detection_masks_reframed', None),
#       use_normalized_coordinates=True,
#       line_thickness=8)

#   display(Image.fromarray(image_np))

def detect(detection_model):
    PATH_TO_TEST_IMAGES_DIR = pathlib.Path(CONFIG['TEST_IMAGES_DIR'])
    TEST_IMAGE_PATHS = sorted(list(PATH_TO_TEST_IMAGES_DIR.glob("*.jpg")))
    print(TEST_IMAGE_PATHS)
    for image_path in TEST_IMAGE_PATHS:
        show_inference(detection_model, image_path)


def main():
    set_config()
    model_name = 'ssd_mobilenet_v1_coco_2017_11_17'
    detection_model = load_model(model_name)
    if FLAGS.action == 'train':
       print('NEED TO IMPLEMENT')
          #  label_dict_l = model_handler.get_label_dict(train_generator) 
    elif FLAGS.action == 'convert':
        print('NEED TO IMPLEMENT')
    elif FLAGS.action == 'detect':
        print(detection_model.signatures['serving_default'].inputs)
        detect(detection_model)
    else:
      print('NO ACTIONS TO PERFORM, PLZ provide an action to do !! ')           

if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  # environment variable when name starts with $
  parser.add_argument('--PATH_TO_LABELS', type=str, default='models/research/object_detection/data/mscoco_label_map.pbtxt', help='Path to labels')
  parser.add_argument('--TEST_IMAGES_DIR', type=str, default='models/research/object_detection/test_images', help='Path to labels')
  parser.add_argument('--action', type=str, default='detect', help='Action to perform')

  FLAGS, unparsed = parser.parse_known_args()
#   print("Start model training")
#   tf.app.run(main=main, argv=[sys.argv[0]] + unparsed)
  main() 

