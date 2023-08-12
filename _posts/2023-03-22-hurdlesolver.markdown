---

layout: post
title:  "Need some help playing Hurdle?"
date:   2023-03-22 14:49:53 +0100
categories: [AI, Algorithms, Solver, Python, Streamlit]
tags: [AI, Algorithms, Python, Streamlit, Entropy]
---

This application aims at helping to beat [Hurdle](https://playhurdle.vercel.app) [1], which is
a [Wordle](https://www.nytimes.com/games/wordle/index.html) [2]
meets [Mastermind](https://en.wikipedia.org/wiki/Mastermind_(board_game)) [3] game.
You can try out Hurdle Solver [here](https://share.streamlit.io/colinschepers/hurdlesolver).

## Gameplay

Hurdle is a slightly harder version of the game Wordle that became very popular last year. Like in Wordle, you need to
guess the five-letter word of the day, where each guess must be a valid word according to the game's dictionary.
After each guess you receive information similar to the game of Mastermind:

- the green tile indicates the number of correct characters in the correct position
- the yellow tile indicates the number of correct characters in the wrong position

For instance, if the word of the day is `CHESS`, the guess `CHASE` would be scored as `3` green and `1` yellow.

## Implementation

The application is written in python and uses only one dependency (Streamlit, see next section).
The vocabulary used by the solver class is a predefined list of around 5000 five-letter words [4].
For performance reasons, when there is no information about a game yet, the suggestions proposed by the solver is based
on a predefined list of 25 good starting words [5].

After providing information to the solver (i.e. the number of the green and yellow tiles given a guess), it will first
filter out all words that are not possible anymore. The remaining candidate words will be sorted using entropy [6].
It is the state of disorder, or randomness, of the resulting distribution of solutions after the particular guess.

For instance, consider the following guesses and their resulting distribution of possible solutions:

- Guess `CHASE`
    - `5` times `5` green and `0` yellow
    - `5` times `4` green and `1` yellow
- Guess `CLOSE`
    - `2` times `5` green and `0` yellow
    - `2` times `4` green and `1` yellow
    - `2` times `4` green and `0` yellow
    - `2` times `3` green and `2` yellow
    - `2` times `3` green and `1` yellow

The guess `CLOSE` has a higher entropy, and would therefore be a better guess. Regardless of which of the 5
options the game returns, you will always rule out 8 of the 10 possible words. The guess `CHASE` on the other hand 
would only cut the space in half.

## Graphical User Interface

The graphical user interface is build using the open-source tool [Streamlit](https://github.com/streamlit/streamlit) [7].
It provides a fast way to build and share data apps in pure python, and once you’ve created an app you can use the
Community Cloud
platform to deploy, manage, and share the app.

[![The graphical user interface](https://raw.githubusercontent.com/colinschepers/HurdleSolver/master/screenshot.png)](https://share.streamlit.io/colinschepers/hurdlesolver)
*The Streamlit based graphical user interface of Hurdle Solver.*

You can find the source code of the application at my personal [GitHub](https://github.com/colinschepers/HurdleSolver).

## Sources

1. [https://playhurdle.vercel.app](https://playhurdle.vercel.app)
2. [https://www.nytimes.com/games/wordle/index.html](https://www.nytimes.com/games/wordle/index.html)
3. [https://en.wikipedia.org/wiki/Mastermind_(board_game)](https://en.wikipedia.org/wiki/Mastermind_(board_game))
4. [https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt](https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt)
5. [https://raw.githubusercontent.com/colinschepers/HurdleSolver/master/top_words.txt](https://raw.githubusercontent.com/colinschepers/HurdleSolver/master/top_words.txt)
6. [https://en.wikipedia.org/wiki/Entropy](https://en.wikipedia.org/wiki/Entropy)
7. [https://github.com/streamlit/streamlit](https://github.com/streamlit/streamlit)
