import {
  BlockquoteFeature,
  BoldFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

/**
 * Article editor. Deliberately limited to what the site's `.prose-apex` styles support, so any
 * content an editor writes renders in the existing design (h1 is reserved for the page title).
 */
export const articleFeatures = () => [
  ParagraphFeature(),
  HeadingFeature({ enabledHeadingSizes: ["h2", "h3"] }),
  BoldFeature(),
  ItalicFeature(),
  LinkFeature({ enabledCollections: [] }),
  UnorderedListFeature(),
  OrderedListFeature(),
  BlockquoteFeature(),
  HorizontalRuleFeature(),
  EXPERIMENTAL_TableFeature(),
  UploadFeature({ collections: { media: { fields: [] } } }),
  FixedToolbarFeature(),
  InlineToolbarFeature(),
];

export const articleEditor = lexicalEditor({ features: articleFeatures });
