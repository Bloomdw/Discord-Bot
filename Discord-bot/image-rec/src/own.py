import tensorflow as tf
import numpy as np
import cv2
import os
import pickle
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Activation, Flatten
from tensorflow.keras.layers import Conv2D, MaxPooling2D
from tensorflow.keras.callbacks import TensorBoard
import time

DIR="D:\Documents\Resources\machine-learning\PetImages"
CATEGORIES= ["Dog", "Cat"]
IMG_SIZE = 50

dense_layers = [0, 1]
layer_sizes = [64]
conv_layers = [3]

def prepare(filepath):
    SIZE = 50
    img_array = cv2.imread(filepath, cv2.IMREAD_GRAYSCALE)
    new_array = cv2.resize(img_array, (SIZE, SIZE))
    return new_array.reshape(-1, SIZE, SIZE, 1)

def create_training_data():
    training_data = []

    for category in CATEGORIES:
        path = os.path.join(DIR, category)
        class_num = CATEGORIES.index(category)
        for img in os.listdir(path):
            try:
                img_array = cv2.imread(os.path.join(path, img), cv2.IMREAD_GRAYSCALE)
                new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
                training_data.append([new_array, class_num])
            except Exception as e:
                pass

    save_training_data(training_data)

def save_training_data(training_data):
    X = []
    Y = []

    for features, label in training_data:
        X.append(features)
        Y.append(label)

    X = np.array(X).reshape(-1, IMG_SIZE, IMG_SIZE, 1)
    Y = np.array(Y)

    pickle_out = open("X.pickle", "wb")
    pickle.dump(X, pickle_out)
    pickle_out.close()

    pickle_out = open("Y.pickle", "wb")
    pickle.dump(Y, pickle_out)
    pickle_out.close()

def train(X, Y):
    for dense_layer in dense_layers:
        for layer_size in layer_sizes:
            for conv_layer in conv_layers:
                Name = "{}-conv-{}-nodes-{}-dense-{}".format(conv_layer, layer_size, dense_layer, int(time.time()))
                tensorboard = TensorBoard(log_dir='logs/{}'.format(Name))
                print(Name)

                model = Sequential()

                model.add(Conv2D(layer_size, (3,3), input_shape=X.shape[1:]))
                model.add(Activation("relu"))
                model.add(MaxPooling2D(pool_size=(2,2)))

                for l in range(conv_layer-1):
                    model.add(Conv2D(layer_size, (3, 3)))
                    model.add(Activation("relu"))
                    model.add(MaxPooling2D(pool_size=(2, 2)))

                model.add(Flatten())
                for l in range(dense_layer):
                    model.add(Dense(layer_size))
                    model.add(Activation("relu"))

                model.add(Dense(1))
                model.add(Activation("sigmoid"))

                model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

                model.fit(X, Y, batch_size=32, epochs=10, validation_split=0.3, callbacks=[tensorboard])

                if (dense_layer > 0):
                    model.save('3x64x1-relu.model')
                else:
                    model.save('3x64x0-relu.model')

#create_training_data()

pickle_in = open("X.pickle", "rb")
X = pickle.load(pickle_in)

pickle_in = open("Y.pickle", "rb")
Y = pickle.load(pickle_in)

X = X/255.0

#train(X, Y)

model = tf.keras.models.load_model("3x64x1.model")

prediction = model.predict([prepare('doggo.jpg')])
print(CATEGORIES[int(prediction[0][0])])

prediction = model.predict([prepare('catto.jpg')])
print(CATEGORIES[int(prediction[0][0])])

model = tf.keras.models.load_model("3x64x0-relu.model")

prediction = model.predict([prepare('doggo.jpg')])
print(CATEGORIES[int(prediction[0][0])])

prediction = model.predict([prepare('catto.jpg')])
print(CATEGORIES[int(prediction[0][0])])





