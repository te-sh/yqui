FROM ruby:3.0.0-slim

RUN apt-get update \
 && apt-get install -y build-essential \
 && addgroup --gid 1000 yqui \
 && adduser --system --uid 1000 --ingroup yqui --disabled-password --gecos '' yqui

USER yqui
ENV HOME /home/yqui
ENV TESTDIR $HOME/test
RUN mkdir -p $TESTDIR

WORKDIR $TESTDIR

Add Gemfile Gemfile.lock ./
RUN bundle install
