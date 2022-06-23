import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';

import { BLACK100, BLACK200, WHITE, GREEN100 } from '../../theme/colors';
import { smallMediumText, normalBoldText, normalText } from '../../theme/fonts';
import Title from '../common/Title';

const Article = ({ article }) => {
  const { fields } = article;

  return (
    <View style={styles.container}>
      <Title label={fields.title} />
      {fields.author && (
        <View style={styles.authoerContainer}>
          {fields.author?.fields?.authorImage?.fields?.file?.url && (
            <View style={styles.avatarWrapper}>
              <FastImage
                style={styles.avatar}
                source={{
                  uri: `https:${fields.author?.fields.authorImage.fields.file.url}`,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          )}
          <View>
            <Text style={styles.label}>{fields.author?.fields.authorName}</Text>
            <Text style={styles.label}>
              {fields.author?.fields.authorTitle}
            </Text>
            <Text style={styles.label}>
              {moment(fields.datePublished).format('MMM DD, YYYY')}
            </Text>
            {fields.datePublished && <View style={styles.underline} />}
          </View>
        </View>
      )}
      {fields.featuredImage?.fields?.file?.url &&
        fields.featuredImage?.fields?.file?.contentType.includes('image') && (
          <FastImage
            style={styles.img}
            source={{
              uri: `https:${fields.featuredImage?.fields?.file?.url}`,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
      {fields.featuredImage?.fields?.file?.url &&
        fields.featuredImage?.fields?.file?.contentType.includes('video') && (
          <View>
            <Video
              source={{
                uri: `https:${fields.featuredImage?.fields?.file?.url}`,
              }}
              playInBackground={false}
              playWhenInactive={false}
              rate={1.0}
              volume={1.0}
              muted={false}
              resizeMode="contain"
              repeat={false}
              onError={(err) => console.log('video loading err', err)}
              onLoad={() => console.log('Video load end')}
              onLoadStart={() => console.log('video load start')}
              onEnd={() => console.log('video end')}
              posterResizeMode="contain"
              style={styles.video}
              controls
            />
          </View>
        )}
      {fields.articleContent && (
        <Markdown
          markdownit={MarkdownIt({ typographer: true }).disable([
            'link',
            'image',
          ])}
          style={styles}>
          {fields.articleContent}
        </Markdown>
      )}
    </View>
  );
};

export default Article;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  authoerContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 53,
  },
  avatarWrapper: {
    width: 46,
    height: 46,
    borderRadius: 30,
    borderColor: GREEN100,
    borderWidth: 1.5,
    padding: 3,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  label: {
    ...smallMediumText,
    color: BLACK200,
    marginBottom: 3,
  },
  underline: {
    marginTop: 5,
    height: 2,
    width: 30,
    backgroundColor: GREEN100,
  },
  content: {
    ...normalBoldText,
    color: BLACK100,
    fontWeight: 'normal',
  },
  img: {
    width: '100%',
    height: 190,
    marginBottom: 36,
  },
  heading1: {
    ...normalText,
    lineHeight: 22,
    color: BLACK100,
    marginTop: 36,
    marginBottom: 12,
  },
  heading2: {
    ...normalText,
    lineHeight: 22,
    color: BLACK100,
    marginTop: 36,
    marginBottom: 12,
  },
  heading3: {
    ...normalText,
    lineHeight: 22,
    color: BLACK100,
    marginTop: 36,
    marginBottom: 12,
  },
  heading4: {
    ...normalText,
    lineHeight: 22,
    color: BLACK100,
    marginTop: 36,
    marginBottom: 12,
  },
  heading5: {
    ...normalText,
    lineHeight: 22,
    color: BLACK100,
    marginTop: 36,
    marginBottom: 12,
  },
  heading6: {
    ...normalText,
    lineHeight: 22,
    color: BLACK100,
    marginTop: 36,
    marginBottom: 12,
  },
  body: {
    ...normalText,
    lineHeight: 22,
    fontWeight: '400',
    color: BLACK100,
  },
  strong: {
    ...normalText,
    lineHeight: 22,
    fontWeight: '700',
    color: BLACK100,
  },
  link: {
    textDecorationLine: 'underline',
    textDecorationColor: BLACK100,
  },
  video: {
    width: '100%',
    height: 400,
  },
});
