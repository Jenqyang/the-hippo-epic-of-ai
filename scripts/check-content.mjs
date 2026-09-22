// Checks everything under content/ before it reaches the build, so a pull
// request that adds a story fails here with a readable message rather than
// deep inside `next build`. Run with `pnpm check`.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const storyDir = join(root, "content", "stories");
const imageDir = join(root, "public", "stories");

const errors = [];
const warnings = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);
const warn = (where, message) => warnings.push(`${where}: ${message}`);

/** The desks, read from the module the site itself uses. */
const sections = [
  ...readFileSync(join(root, "app", "_data", "sections.ts"), "utf8")
    .split("export const sectionNames = {")[1]
    .split("} as const;")[0]
    .matchAll(/^\s*"?([a-z-]+)"?:/gm),
].map(([, slug]) => slug);

const FIELDS = {
  title: { required: true, type: "string" },
  originalTitle: { type: "string" },
  section: { required: true, type: "string" },
  outlet: { required: true, type: "string" },
  published: { required: true, type: "string" },
  url: { required: true, type: "string", nullable: true },
  image: { type: "string" },
  summary: { required: true, type: "string" },
  quote: { type: "string" },
  quoteOriginal: { type: "string" },
  coverage: { type: "array" },
};

const COVERAGE_FIELDS = {
  title: { required: true, type: "string" },
  outlet: { type: "string" },
  published: { type: "string" },
  url: { type: "string", nullable: true },
};

const isLink = (value) => /^https?:\/\/\S+$/.test(value);

/** Check one object against a field table: no unknown keys, no wrong types. */
function checkShape(where, object, fields) {
  for (const [key, value] of Object.entries(object)) {
    const field = fields[key];
    if (!field) {
      fail(where, `unknown field "${key}" (allowed: ${Object.keys(fields).join(", ")})`);
      continue;
    }
    if (value === null) {
      if (!field.nullable) fail(where, `"${key}" cannot be null`);
      continue;
    }
    if (field.type === "array" ? !Array.isArray(value) : typeof value !== field.type) {
      fail(where, `"${key}" must be a ${field.type}`);
      continue;
    }
    if (field.type === "string" && value.trim() === "") {
      fail(where, `"${key}" is empty — leave the field out instead`);
    }
  }
  for (const [key, field] of Object.entries(fields)) {
    if (field.required && !(key in object)) fail(where, `missing "${key}"`);
  }
}

const files = readdirSync(storyDir).filter((file) => file !== ".gitkeep");
const ids = new Set();
const seenUrls = new Map();
const usedImages = new Set();

for (const file of files.sort()) {
  const where = `content/stories/${file}`;
  if (!/^\d{3}\.json$/.test(file)) {
    fail(where, "file name must be three digits plus .json, e.g. 216.json");
    continue;
  }
  ids.add(file.slice(0, 3));

  let story;
  try {
    story = JSON.parse(readFileSync(join(storyDir, file), "utf8"));
  } catch (error) {
    fail(where, `not valid JSON — ${error.message}`);
    continue;
  }

  checkShape(where, story, FIELDS);

  if (story.section && !sections.includes(story.section)) {
    fail(where, `unknown section "${story.section}" (one of: ${sections.join(", ")})`);
  }
  // A handful of sources print no date at all; the dateline says 日期不详.
  if (typeof story.published === "string" && !/\d{4}/.test(story.published)) {
    warn(where, `"published" has no four-digit year, so the dateline will read 日期不详`);
  }
  if (typeof story.url === "string") {
    if (!isLink(story.url)) fail(where, `"url" must start with http:// or https://`);
    const first = seenUrls.get(story.url);
    if (first) warn(where, `same "url" as ${first} — is this the same report twice?`);
    else seenUrls.set(story.url, where);
  }
  if (typeof story.image === "string") {
    usedImages.add(story.image);
    if (!/^[\w-]+\.(jpg|jpeg|png|webp)$/.test(story.image)) {
      fail(where, `"image" must be a file name such as "${file.slice(0, 3)}.jpg"`);
    } else if (!existsSync(join(imageDir, story.image))) {
      fail(where, `"image" points at public/stories/${story.image}, which is not in the repo`);
    }
  }
  if (Array.isArray(story.coverage)) {
    story.coverage.forEach((item, index) => {
      const at = `${where} coverage[${index}]`;
      if (typeof item !== "object" || item === null || Array.isArray(item)) {
        fail(at, "must be an object");
        return;
      }
      checkShape(at, item, COVERAGE_FIELDS);
      if (typeof item.url === "string" && !isLink(item.url)) {
        fail(at, `"url" must start with http:// or https://`);
      }
      if (item.url && item.url === story.url) {
        fail(at, "repeats the story's own link");
      }
    });
  }
}

for (const file of readdirSync(imageDir)) {
  if (file !== ".gitkeep" && !usedImages.has(file)) {
    warn(`public/stories/${file}`, "no story uses this photo");
  }
}

for (const line of warnings) console.warn(`warning  ${line}`);
for (const line of errors) console.error(`error    ${line}`);

if (errors.length) {
  console.error(`\n${errors.length} problem(s) in content/. Nothing was changed.`);
  process.exit(1);
}
console.log(`content ok — ${ids.size} stories`);
