#! /usr/bin/env node

import mongoose from 'mongoose';
import Size from './models/size.js';
import Breed from './models/breed.js';
import Dog from './models/dog.js';

console.log(
  'This script populates some test sizes, breed and dogs to the database. Database should be specified as argument'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const sizes = [];
const breeds = [];
const dogs = [];

const { set, connect, connection } = mongoose;
set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createSizes();
  await createBreeds();
  await createDogs();
  console.log('Debug: Closing mongoose');
  connection.close();
}

async function sizeCreate(index, name, description) {
  const size = new Size({ name, description });
  await size.save();
  sizes[index] = size;
  console.log(`Added size: ${name}`);
}

async function breedCreate(index, name, description, size, life_expectancy) {
  const breed = new Breed({
    name,
    description,
    size,
    life_expectancy,
  });
  await breed.save();
  breeds[index] = breed;
  console.log(`Added breed ${name}`);
}

async function dogCreate(index, name, breed, age, weight, height) {
  const dogDetail = { name, breed };
  if (age) dogDetail.age = age;
  if (weight) dogDetail.weight = weight;
  if (height) dogDetail.height = height;

  const dog = new Dog(dogDetail);
  await dog.save();
  dogs[index] = dog;
  console.log(`Added dog: ${name} - ${breed}`);
}

async function createSizes() {
  console.log('Adding sizes');
  await Promise.all([
    sizeCreate(
      0,
      'Small',
      'Tiny little things. Can fit in a purse or handbag. Some come with a temper'
    ),
    sizeCreate(
      1,
      'Medium',
      'Middle of the pack. You can still carry them easily. Peak dog form'
    ),
    sizeCreate(
      2,
      'Large',
      'Big heavy creatures. They think they are still a puppy. Usually gentle'
    ),
  ]);
}

async function createBreeds() {
  console.log('Adding breeds');
  await Promise.all([
    breedCreate(
      0,
      'Border Collie',
      "A remarkably bright workaholic, the Border Collie is an amazing dog. Borders are among the canine kingdom's most agile, balanced, and durable citizens. The intelligence, athleticism, and trainability of Borders have a perfect outlet in agility training. These energetic dogs will settle down for cuddle time when the workday is done.",
      sizes[1],
      13
    ),
    breedCreate(
      1,
      'Siberian Husky',
      'Siberian Husky, a thickly coated, compact sled dog of medium size and great endurance, was developed to work in packs, pulling light loads at moderate speeds over vast frozen expanses. Sibes are friendly, fastidious, and dignified. Quick and nimble-footed, Siberians are known for their powerful but seemingly effortless gait. As born pack dogs, they enjoy family life and get on well with other dogs.',
      sizes[1],
      13
    ),
    breedCreate(
      2,
      'Chihuahua',
      "The Chihuahua is a tiny dog with a huge personality. A national symbol of Mexico, these alert and amusing 'purse dogs' stand among the oldest breeds of the Americas, with a lineage going back to the ancient kingdoms of pre-Columbian times. The Chihuahua is a balanced, graceful dog of terrier-like demeanor. Chihuahuas possess loyalty, charm, and big-dog attitude.",
      sizes[0],
      15
    ),
    breedCreate(
      3,
      'Shih Tzu',
      "That face! Those big dark eyes looking up at you with that sweet expression! It's no surprise that Shih Tzu owners have been so delighted with this little 'Lion Dog' for a thousand years. Where Shih Tzu go, giggles and mischief follow. The Shih Tzu is known to be especially affectionate with children. As a small dog bred to spend most of their day inside royal palaces, they make a great pet if you live in an apartment or lack a big backyard.",
      sizes[0],
      14
    ),
    breedCreate(
      4,
      'Great Dane',
      "The easygoing Great Dane, the mighty 'Apollo of Dogs', is a total joy to live with, but owning a dog of such imposing size, weight, and strength is a commitment not to be entered into lightly. Danes tower over most other dogs and when standing on their hind legs, they are taller than most people. These powerful giants are the picture of elegance and balance, with the smooth and easy stride of born noblemen. Despite their sweet nature, Danes are alert home guardians. ",
      sizes[2],
      9
    ),
    breedCreate(
      5,
      'Borzoi',
      'Among the most impressively beautiful of all dogs, the aristocratic Borzoi is cherished for his calm, agreeable temperament. In full stride, he is a princely package of strength, grace, and glamour. Borzoi are large, elegant sighthounds.  Affectionate family dogs, Borzoi are nonetheless a bit too dignified to wholeheartedly enjoy a lot of roughhousing.',
      sizes[2],
      12
    ),
  ]);
}

async function createDogs() {
  dogCreate(0, 'Hermes', breeds[0], 4, 17, 50);
  dogCreate(1, 'Athena', breeds[0], 6, null, 46);
  dogCreate(2, 'Demeter', breeds[1], 10, 18, null);
  dogCreate(3, 'Persephone', breeds[1], 2, null, 50);
  dogCreate(4, 'Ares', breeds[2], 3, null, 13);
  dogCreate(5, 'Aphrodite', breeds[3], 4, null, null);
  dogCreate(6, 'Dionysus', breeds[3], null, null);
  dogCreate(7, 'Apollo', breeds[4], 5, 49, 81);
  dogCreate(8, 'Artemis', breeds[4], 5, 47, 76);
  dogCreate(9, 'Hephaestus', breeds[5], 11, 45, 76);
}
