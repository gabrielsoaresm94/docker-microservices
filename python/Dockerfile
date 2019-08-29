FROM python:3-alpine
COPY requirements.txt /

# RUN sudo apt-get update
# RUN sudo apt-get install curl
# RUN curl https://bootstrap.pypa.io/get-pip.py > get-pip.py
# RUN sudo pip install gTTS

RUN pip install -r /requirements.txt

COPY . /app
WORKDIR /app

EXPOSE 5000

CMD [ "python", "./index.py" ]