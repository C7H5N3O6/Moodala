const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const moodButtons = document.querySelectorAll('.mood-btn');
const quoteContainer = document.getElementById('quote-container');
const genderSwitch = document.getElementById('gender-switch');

const youtubeUrl = document.getElementById('youtube-url');
const playAudio = document.getElementById('play-audio');
const pauseAudio = document.getElementById('pause-audio');
const stopAudio = document.getElementById('stop-audio');

let player;

// Quotes embedded in CSV-like format
const csvQuotes = `
ID,Mood,Quote
,Happy,Happiness is not something ready made. It comes from your own actions. — Dalai Lama
2,Happy,The purpose of our lives is to be happy. — Dalai Lama
3,Happy,Happiness is the best makeup. — Drew Barrymore
4,Happy,Happiness depends upon ourselves. — Aristotle
5,Happy,For every minute you are angry you lose sixty seconds of happiness. — Ralph Waldo Emerson
6,Happy,The only joy in the world is to begin. — Cesare Pavese
7,Happy,Happiness is the secret to all beauty. There is no beauty without happiness. — Christian Dior
8,Happy,The more you praise and celebrate your life. the more there is in life to celebrate. — Oprah Winfrey
9,Happy,Count your age by friends. not years. Count your life by smiles. not tears. — John Lennon
10,Happy,Happiness often sneaks in through a door you didn't know you left open. — John Barrymore
11,Happy,Smile more. Worry less.
12,Happy,Happiness is a direction. not a place. — Sydney J. Harris
13,Happy,Be happy with what you have. Be excited about what you want. — Alan Cohen
14,Happy,Stay close to people who feel like sunshine.
15,Happy,Happiness is not by chance. but by choice. — Jim Rohn
16,Happy,If you want to be happy. be. — Leo Tolstoy
17,Happy,Happiness is when what you think. what you say. and what you do are in harmony. — Mahatma Gandhi
18,Happy,A happy soul is the best shield for a cruel world. — Atticus
19,Happy,Take time to make your soul happy.
20,Happy,Let us be grateful to the people who make us happy; they are the charming gardeners who make our souls blossom. — Marcel Proust
21,Happy,Happiness radiates like the fragrance from a flower and draws all good things toward you. — Maharishi Mahesh Yogi
22,Happy,There is only one happiness in this life. to love and be loved. — George Sand
23,Happy,The happiest people don't have the best of everything; they make the best of everything. — Unknown
24,Happy,Happiness is not out there. it's in you.
25,Happy,To be happy is to grow. to change. and to find purpose in every small thing. — Unknown
26,Happy,Happiness grows at our own firesides. and is not to be picked in strangers' gardens. — Douglas Jerrold
27,Happy,True happiness consists not in the multitude of friends. but in their worth and choice. — Samuel Johnston
28,Happy,Be happy for this moment. This moment is your life. — Omar Khayyam
29,Happy,Find joy in the journey.
30,Happy,The secret of happiness is not in doing what one likes. but in liking what one does. — James M. Barrie
31,Happy,Happiness comes in waves. It'll find you again.
32,Happy,Find happiness in the ordinary.
33,Happy,The happier you are. the more beautiful you become. — Anonymous
34,Happy,Happiness is a warm puppy. — Charles M. Schulz
35,Happy,Choose to be happy every day. no matter what.
36,Happy,Every moment is a fresh beginning. — T.S. Eliot
37,Happy,Happiness is contagious. Spread it.
38,Happy,Think happy. be happy.
39,Happy,Happiness is not a goal; it is a by-product. — Eleanor Roosevelt
40,Happy,The most wasted of all days is one without laughter. — E.E. Cummings
41,Happy,Happiness is not about getting all you want; it's about enjoying all you have.
42,Happy,You deserve to be happy. It's not selfish. it's a necessity.
43,Happy,Happiness comes when we stop complaining about the troubles we have and offer thanks for all the troubles we don't have.
44,Happy,Being happy never goes out of style. — Lilly Pulitzer
45,Happy,Do more of what makes you happy.
46,Happy,Happiness is not something you postpone for the future; it is something you design for the present. — Jim Rohn
47,Happy,When you love what you have. you have everything you need.
48,Happy,Be happy not because everything is good. but because you can see the good in everything.
49,Happy,Let your smile change the world. but don't let the world change your smile.
50,Happy,Happiness blooms from within.
51,Sad,Tears are words that need to be written. — Paulo Coelho
52,Sad,Sometimes. you have to know when to stop hoping. — Karen Salmansohn
53,Sad,Crying is how your heart speaks when your lips can't explain the pain.
54,Sad,It's okay to cry when there's too much on your mind. The clouds rain too when things get heavy.
55,Sad,Don't cry because it's over. smile because it happened. — Dr. Seuss
56,Sad,The pain never really goes away; you just elevate and get used to it by growing stronger.
57,Sad,The emotion that can break your heart is sometimes the very one that heals it. — Nicholas Sparks
58,Sad,It's hard to forget someone who gave you so much to remember.
59,Sad,Sadness flies away on the wings of time. — Jean de La Fontaine
60,Sad,What brings us to tears. will lead us to grace. Our pain is never wasted. — Bob Goff
61,Sad,Sadness is but a wall between two gardens. — Khalil Gibran
62,Sad,Every human walks around with a certain kind of sadness. They may not wear it on their sleeves. but it's there if you look deep. — Taraji P. Henson
63,Sad,Grief is not as heavy as guilt. but it takes more away from you. — Veronica Roth
64,Sad,Sorrow is one of the vibrations that prove the fact of living. — Antoine de Saint-Exupéry
65,Sad,Sometimes we create our own heartbreaks through expectation.
66,Sad,Behind every sweet smile. there is a bitter sadness that no one can ever see and feel. — Tupac Shakur
67,Sad,You cannot protect yourself from sadness without protecting yourself from happiness. — Jonathan Safran Foer
68,Sad,It's sad when someone you know becomes someone you knew. — Henry Rollins
69,Sad,You can't prevent things from happening. That's part of life. But you can take control of how you respond to it. — Unknown
70,Sad,Sad things happen. They do. But we don't need to live sad forever. — Mattie Stepanek
71,Sad,Although the world is full of suffering. it is full also of the overcoming of it. — Helen Keller
72,Sad,When you feel like giving up. just remember the reason why you held on for so long.
73,Sad,The word 'happiness' would lose its meaning if it were not balanced by sadness. — Carl Jung
74,Sad,One cannot be deeply responsive to the world without being saddened very often. — Erich Fromm
75,Sad,Sadness is a warning. just as physical pain is a warning. We should learn how to manage it. — Alain de Botton
76,Sad,There are moments in life when you miss someone so much that you just want to pick them from your dreams and hug them for real. — Paulo Coelho
77,Sad,When you are happy. you enjoy the music. But. when you are sad. you understand the lyrics. — Frank Ocean
78,Sad,Experiencing sadness and anger can make you feel more creative. and by being creative. you can get beyond your pain or negativity. — Yoko Ono
79,Sad,Sadness is almost never anything but a form of fatigue. — Andre Gide
80,Sad,Sadness gives depth. Happiness gives height. Sadness gives roots. Happiness gives branches. Happiness is like a tree going into the sky. and sadness is like the roots going down into the womb of the earth. — Osho
81,Sad,It's easy to cry when you realize that everyone you love will reject you or die. — Chuck Palahniuk
82,Sad,Heavy hearts. like heavy clouds in the sky. are best relieved by the letting of a little water. — Christopher Morley
83,Sad,There is no greater sorrow than to recall happiness in times of misery. — Dante Alighieri
84,Sad,Your sadness is a gift. Don't reject it. Don't rush it. Live it fully and use it as fuel to change and grow. — Maxime Lagacé
85,Sad,Tears shed for another person are not a sign of weakness. They are a sign of a pure heart. — José N. Harris
86,Sad,Some days are just bad days. that's all. You have to experience sadness to know happiness. — Dita Von Teese
87,Sad,Our sweetest songs are those that tell of saddest thought. — Percy Bysshe Shelley
88,Sad,Sadness does not last forever when we walk in the direction of that which we always desired. — Paulo Coelho
89,Sad,The good times of today are the sad thoughts of tomorrow. — Bob Marley
90,Sad,You don't have to be strong all the time. Sometimes you just need to be alone and let your tears out.
91,Sad,Sometimes we need to cry out our tears to make room for our hearts to smile again.
92,Sad,No matter how hard the past was. you can always begin again. — Buddha
93,Sad,Don't let yesterday take up too much of today. — Will Rogers
94,Sad,Life is full of highs and lows. embrace them all and never stop growing.
95,Sad,This too shall pass. Life is too precious to be spent in sadness.
96,Sad,The walls we build around us to keep sadness out also keeps out the joy. — Jim Rohn
97,Sad,Behind every sad face. there's an untold story waiting to be heard.
98,Sad,It's okay to not be okay. Just don't give up.
99,Sad,Stars can't shine without darkness.
100,Sad,Tough times never last. but tough people do. — Robert H. Schuller
101,Stressed,One of the best pieces of advice I ever got was from a horse master. He told me to go slow to go fast. I think that applies to everything in life. We live as though there aren't enough hours in the day but if we do each thing calmly and carefully. we will get it done quicker and with much less stress. — Viggo Mortensen
102,Stressed,It's not the load that breaks you down. it's the way you carry it. — Lou Holtz
103,Stressed,You can't calm the storm. so stop trying. What you can do is calm yourself. The storm will pass. — Timber Hawkeye
104,Stressed,The greatest weapon against stress is our ability to choose one thought over another. — William James
105,Stressed,Do not anticipate trouble or worry about what may never happen. Keep in the sunlight. — Benjamin Franklin
106,Stressed,If you want to conquer the anxiety of life. live in the moment. live in the breath. — Amit Ray
107,Stressed,Calm mind brings inner strength and self-confidence. so that's very important for good health. — Dalai Lama
108,Stressed,Sometimes the most productive thing you can do is relax. — Mark Black
109,Stressed,Stress is caused by being ‘here' but wanting to be ‘there.' — Eckhart Tolle
110,Stressed,You must learn to let go. Release the stress. You were never in control anyway. — Steve Maraboli
111,Stressed,The time to relax is when you don't have time for it. — Sydney J. Harris
112,Stressed,Adopting the right attitude can convert a negative stress into a positive one. — Hans Selye
113,Stressed,Give your stress wings and let it fly away. — Terri Guillemets
114,Stressed,Tension is who you think you should be. Relaxation is who you are. — Chinese Proverb
115,Stressed,Your calm mind is the ultimate weapon against your challenges. So relax. — Bryant McGill
116,Stressed,Much of the stress that people feel doesn't come from having too much to do. It comes from not finishing what they started. — David Allen
117,Stressed,Rule number one is. don't sweat the small stuff. Rule number two is. it's all small stuff. — Robert Eliot
118,Stressed,Slow down and everything you are chasing will come around and catch you. — John De Paola
119,Stressed,Take life one sip at a time. — Matt Haig
120,Stressed,The best way to pay for a lovely moment is to enjoy it. — Richard Bach
121,Calm,The more tranquil a man becomes. the greater is his success. his influence. his power for good. — James Allen
122,Calm,Calmness is the cradle of power. — Josiah Gilbert Holland
123,Calm,Don't try to force anything. Let life be a deep let-go. God opens millions of flowers every day without forcing the buds. — Osho
124,Calm,Nothing can bring you peace but yourself. — Ralph Waldo Emerson
125,Calm,Peace comes from within. Do not seek it without. — Buddha
126,Calm,Do not let the behavior of others destroy your inner peace. — Dalai Lama
127,Calm,The nearer a man comes to a calm mind. the closer he is to strength. — Marcus Aurelius
128,Calm,He who is of a calm and happy nature will hardly feel the pressure of age. — Plato
129,Calm,There is a calmness to a life lived in gratitude. a quiet joy. — Ralph H. Blum
130,Calm,For fast-acting relief. try slowing down. — Lily Tomlin
131,Calm,The greatest prayer is patience. — Buddha
132,Calm,Life is 10% what happens to us and 90% how we react to it. — Charles R. Swindoll
133,Calm,Sometimes it's not the strength but gentleness that cracks the hardest shells. — Richard Paul Evans
134,Calm,Patience is the companion of wisdom. — Saint Augustine
135,Calm,Peace begins with a smile. — Mother Teresa
136,Motivated,The best way to predict the future is to create it. — Abraham Lincoln
137,Motivated,Don't watch the clock; do what it does. Keep going. — Sam Levenson
138,Motivated,You don't have to be great to start. but you have to start to be great. — Zig Ziglar
139,Motivated,Opportunities don't happen. you create them. — Chris Grosser
140,Motivated,Success is the sum of small efforts. repeated day in and day out. — Robert Collier
141,Motivated,Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. — Roy T. Bennett
142,Motivated,The secret of getting ahead is getting started. — Mark Twain
143,Motivated,Success is not final. failure is not fatal: It is the courage to continue that counts. — Winston Churchill
144,Motivated,Your time is limited. so don't waste it living someone else's life. — Steve Jobs
145,Motivated,Believe you can and you're halfway there. — Theodore Roosevelt
146,Motivated,The harder you work for something. the greater you'll feel when you achieve it.
147,Motivated,Perseverance is not a long race; it is many short races one after the other. — Walter Elliot
148,Motivated,Success usually comes to those who are too busy to be looking for it. — Henry David Thoreau
149,Motivated,What you get by achieving your goals is not as important as what you become by achieving your goals. — Zig Ziglar
150,Motivated,Dream big and dare to fail. — Norman Vaughan
151,Energized,The energy of the mind is the essence of life. — Aristotle
152,Energized,Passion is energy. Feel the power that comes from focusing on what excites you. — Oprah Winfrey
153,Energized,You are the only one who can limit your greatness.
154,Energized,Turn your energy into building what you love. not hating what you don't.
155,Energized,The more you lose yourself in something bigger than yourself. the more energy you will have. — Norman Vincent Peale
156,Energized,Positive energy knows no bounds. It radiates from within and changes everything in its path.
157,Energized,Energy and persistence conquer all things. — Benjamin Franklin
158,Energized,With the new day comes new strength and new thoughts. — Eleanor Roosevelt
159,Energized,A champion is someone who gets up when they can't. — Jack Dempsey
160,Energized,Your energy introduces you before you even speak.
161,Energized,It's not about having time. It's about making time.
162,Energized,Do not wait to strike till the iron is hot. but make it hot by striking. — William Butler Yeats
163,Energized,The sun himself is weak when he first rises. and gathers strength
164,Energized,The sun himself is weak when he first rises. and gathers strength and courage as the day gets on. — Charles Dickens
165,Energized,You are never too old to set another goal or to dream a new dream. — C.S. Lewis
166,Energized,The future depends on what you do today. — Mahatma Gandhi
167,Energized,The only way to do great work is to love what you do. — Steve Jobs
168,Energized,Keep your face always toward the sunshine—and shadows will fall behind you. — Walt Whitman
169,Energized,What lies behind us and what lies before us are tiny matters compared to what lies within us. — Ralph Waldo Emerson
170,Energized,Do something today that your future self will thank you for.
171,Energized,It does not matter how slowly you go as long as you do not stop. — Confucius
172,Energized,Success is walking from failure to failure with no loss of enthusiasm. — Winston S. Churchill
173,Energized,You have within you right now. everything you need to deal with whatever the world can throw at you. — Brian Tracy
174,Energized,Life is 10% what happens to us and 90% how we react to it. — Charles R. Swindoll
175,Energized,You miss 100% of the shots you don't take. — Wayne Gretzky
176,Energized,Success is not how high you have climbed. but how you make a positive difference to the world. — Roy T. Bennett
177,Energized,The difference between a successful person and others is not a lack of strength. not a lack of knowledge. but rather a lack in will. — Vince Lombardi
178,Energized,The best revenge is massive success. — Frank Sinatra
179,Energized,Life is not about finding yourself. Life is about creating yourself. — George Bernard Shaw
180,Energized,The only limit to our realization of tomorrow will be our doubts of today. — Franklin D. Roosevelt
181,Energized,Start where you are. Use what you have. Do what you can. — Arthur Ashe
182,Energized,To live is the rarest thing in the world. Most people exist. that is all. — Oscar Wilde
183,Energized,Success is not just about what you accomplish in your life. it's about what you inspire others to do. — Unknown
184,Energized,You don't have to be great to start. but you have to start to be great. — Zig Ziglar
185,Energized,The road to success and the road to failure are almost exactly the same. — Colin R. Davis
186,Energized,In order to succeed. your desire for success should be greater than your fear of failure. — Bill Cosby
187,Energized,What we fear doing most is usually what we most need to do. — Tim Ferriss
188,Energized,Your limitation—it's only your imagination.
189,Energized,Push yourself. because no one else is going to do it for you.
190,Energized,Great things never come from comfort zones.
191,Energized,Dream it. Wish it. Do it.
192,Energized,Success doesn't just find you. You have to go out and get it.
193,Energized,The harder you work for something. the greater you'll feel when you achieve it.
194,Energized,Dream bigger. Do bigger.
195,Energized,Don't stop when you're tired. Stop when you're done.
196,Energized,Wake up with determination. Go to bed with satisfaction.
197,Energized,Do what you can with all you have. wherever you are. — Theodore Roosevelt
198,Energized,The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt
199,Energized,Hardships often prepare ordinary people for an extraordinary destiny. — C.S. Lewis
200,Energized,Success is the sum of small efforts. repeated day in and day out. — Robert Collier
201,Happy,The only way to do great work is to love what you do. — Steve Jobs
202,Happy,Count your rainbows. not your thunderstorms.
203,Happy,Happiness is not something ready-made. It comes from your own actions. — Dalai Lama
204,Happy,The purpose of our lives is to be happy. — Dalai Lama
205,Happy,Be happy for this moment. This moment is your life. — Omar Khayyam
206,Happy,Happiness is not by chance. but by choice. — Jim Rohn
207,Happy,The most important thing is to enjoy your life—to be happy. It's all that matters. — Audrey Hepburn
208,Happy,Happiness is a warm puppy. — Charles M. Schulz
209,Happy,The best way to cheer yourself up is to try to cheer somebody else up. — Mark Twain
210,Happy,For every minute you are angry you lose sixty seconds of happiness. — Ralph Waldo Emerson
211,Happy,Laughter is the sun that drives winter from the human face. — Victor Hugo
212,Happy,The greatest discovery of my generation is that a human being can alter his life by altering his attitude. — William James
213,Happy,Keep your face always toward the sunshine—and shadows will fall behind you. — Walt Whitman
214,Happy,The best is yet to come. — Frank Sinatra
215,Happy,Do more of what makes you happy.
216,Happy,Happiness is not having what you want. It is appreciating what you have.
217,Happy,The only limit to our realization of tomorrow will be our doubts of today. — Franklin D. Roosevelt
218,Happy,The joy of life is becoming a person you are proud of.
219,Happy,A happy mind is a constant feast.
220,Happy,Happiness can be found even in the darkest of times if one only remembers to turn on the light. — Albus Dumbledore
221,Happy,Life is short. and it's up to you to make it sweet. — Sarah Louise Delany
222,Happy,Your happiness is a reflection of your mindset.
223,Happy,The happiness of your life depends on the quality of your thoughts. — Marcus Aurelius
224,Happy,Choose to be happy. and happiness will choose you.
225,Happy,Smiles are free but they are worth a lot.
226,Sad,Tears are words the heart can't express.
227,Sad,The greatest pain that comes from love is loving someone you can never have.
228,Sad,Sadness flies away on the wings of time. — Jean de La Fontaine
229,Sad,It's okay to be sad sometimes.
230,Sad,The soul would have no rainbow if the eyes had no tears. — John Vance Cheney
231,Sad,Don't cry because it's over. smile because it happened. — Dr. Seuss
232,Sad,Sadness is but a wall between two gardens. — Khalil Gibran
233,Sad,The only thing more exhausting than being sad is pretending that you're not.
234,Sad,You can't stop the waves. but you can learn to surf. — Jon Kabat-Zinn
235,Sad,Sometimes. you need to take a break from everyone and spend time alone to experience life.
236,Sad,It's okay to be a glowstick; sometimes we have to break before we shine.
237,Sad,Every man has his secret sorrows which the world knows not; and often times we call a man cold when he is only sad. — Henry Wadsworth Longfellow
238,Sad,We are all in the gutter. but some of us are looking at the stars. — Oscar Wilde
239,Sad,You can't heal a wound by saying it's not there.
240,Sad,When it rains. look for rainbows. When it's dark. look for stars. — Oscar Wilde
241,Sad,Sadness is also a kind of happiness.
242,Sad,The best way out is always through. — Robert Frost
243,Sad,Every day may not be good. but there is something good in every day. — Alice Morse Earle
244,Sad,The wound is the place where the Light enters you. — Rumi
245,Sad,Sadness is not a sign of weakness. but of strength.
246,Stressed,Stressed? It's just a feeling. not a definition.
247,Stressed,It's not the load that breaks you down. it's the way you carry it. — Lou Holtz
248,Stressed,Sometimes the most productive thing you can do is relax.
249,Stressed,Stress is not what happens to us. It's our response to what happens. And response is something we can choose. — Maureen Killoran
250,Stressed,Take a deep breath. it's just a bad day. not a bad life.
251,Stressed,Stress less. live more.
252,Stressed,Keep your mind calm and your heart open.
253,Stressed,Don't let yesterday take up too much of today. — Will Rogers
254,Stressed,Stress is an illusion. It's how we perceive our circumstances.
255,Stressed,Almost everything will work again if you unplug it for a few minutes. including you. — Anne Lamott
256,Stressed,You can't control everything. Sometimes you just need to relax and have faith that things will work out.
257,Stressed,In times of stress. remember that you are not alone.
258,Stressed,The time to relax is when you don't have time for it. — Sidney J. Harris
259,Stressed,When you feel overwhelmed. remember: the storm will pass.
260,Stressed,You can do anything. but not everything. — David Allen
261,Calm,Calmness is the cradle of power. — Josiah Gilbert Holland
262,Calm,Nothing can bring you peace but yourself. — Ralph Waldo Emerson
263,Calm,In the midst of movement and chaos. keep stillness inside of you. — Deepak Chopra
264,Calm,Peace is not the absence of conflict. but the ability to cope with it. — Dorothy Thomas
265,Calm,The quieter you become. the more you can hear. — Ram Dass
266,Calm,Serenity is not found in the absence of turmoil. but in how we navigate through it.
267,Calm,Sometimes you just need to take a break and relax.
268,Calm,Stillness is where the magic happens.
269,Calm,Letting go creates an opening for the unknown.
270,Calm,Calmness is the ultimate state of mind.
271,Calm,A calm mind brings inner strength and self-confidence.
272,Calm,The greatest weapon against stress is our ability to choose one thought over another. — William James
273,Calm,Breathe in peace. breathe out chaos.
274,Calm,Stillness is where the magic happens.
275,Calm,True peace comes from within.
276,Calm,When everything seems to be going against you. remember that the airplane takes off against the wind. — Henry Ford
277,Calm,Inhale peace. exhale tension.
278,Calm,The mind is everything. What you think. you become. — Buddha
279,Calm,Choose calm over chaos.
280,Calm,With calmness. there is clarity.
281,Happy,The best way to predict your future is to create it. — Abraham Lincoln
282,Happy,Happiness is a choice. and I choose to be happy.
283,Happy,Joy is not in things; it is in us. — Richard Wagner
284,Happy,Happiness is contagious; pass it on!
285,Happy,There is no path to happiness; happiness is the path. — Buddha
286,Happy,You deserve to be happy. You deserve to live a life you love.
287,Happy,The happiest people don't have the best of everything; they make the best of everything.
288,Happy,Let your smile change the world. but don't let the world change your smile.
289,Happy,Your smile is your logo. your personality is your business card. and how you leave others feeling after an experience with you becomes your trademark. — Jay Danzie
290,Happy,Happiness blooms from within.
291,Happy,Create your own sunshine.
292,Happy,Life is a collection of moments. Make them count.
293,Happy,Happiness is a direction. not a place.
294,Happy,You bring happiness wherever you go.
295,Happy,Happiness is the highest form of health. — Dalai Lama
296,Happy,Let your heart be your compass.
297,Happy,The happiness you feel is in direct proportion to the love you give.
298,Happy,Be a voice. not an echo.
299,Happy,Embrace the glorious mess that you are.
300,Happy,Choose joy. even in the mundane.
301,Sad,Sadness is a friend that teaches us to appreciate joy.
302,Sad,The best way to heal a broken heart is to give God all the pieces. — Unknown
303,Sad,Every cloud has a silver lining.
304,Sad,In the middle of difficulty lies opportunity. — Albert Einstein
305,Sad,Your present situation is not your final destination.
306,Sad,It's okay to feel sad. It's part of being human.
307,Sad,Pain is temporary; quitting lasts forever.
308,Sad,This too shall pass.
309,Sad,Stars can't shine without darkness.
310,Sad,Sadness is just a state of mind.
311,Sad,When you're lost in the dark. just remember you're not alone.
312,Sad,Courage is the ability to face sadness and continue.
313,Sad,Sometimes the bravest and most important thing you can do is just show up. — Brené Brown
314,Sad,Your sadness is valid; feel it and then let it go.
315,Sad,Grief is the price we pay for love. — Queen Elizabeth II
316,Sad,Even the darkest night will end and the sun will rise. — Victor Hugo
317,Sad,Behind every cloud. the sun is still shining.
318,Sad,No rain. no flowers.
319,Sad,Sometimes. you have to take a step back to see the bigger picture.
320,Sad,Life is a balance of holding on and letting go.
321,Stressed,Stress is caused by being ‘here' but wanting to be ‘there'.
322,Stressed,Sometimes you need to disconnect to reconnect.
323,Stressed,Do not anticipate trouble. or worry about what may never happen. — Benjamin Franklin
324,Stressed,Stress should be a powerful driving force. not an obstacle.
325,Stressed,The greatest weapon against stress is our ability to choose one thought over another. — William James
326,Stressed,The pressure you feel is not as strong as your ability to cope.
327,Stressed,Take a deep breath; it's just a bad day. not a bad life.
328,Stressed,Feelings are just visitors. Let them come and go.
329,Stressed,A calm mind brings inner strength and self-confidence.
330,Stressed,The mind is everything. What you think. you become. — Buddha
331,Calm,Tranquility is the perfect state of mind.
332,Calm,Letting go is the hardest as well as the easiest thing to do.
333,Calm,Calmness is the cradle of power.
334,Calm,Still waters run deep.
335,Calm,Calmness and composure are the secrets of success.
336,Calm,In calmness. you find clarity.
337,Calm,Inner peace begins the moment you choose not to allow another person or event to control your emotions. — Unknown
338,Calm,The greatest step towards a life of simplicity is to learn to let go.
339,Calm,With calmness. you can think more clearly.
340,Calm,Nature does not hurry. yet everything is accomplished. — Lao Tzu
341,Calm,Seek peace and pursue it.
342,Calm,A calm sea does not make a skilled sailor.
343,Calm,Be like water. my friend. — Bruce Lee
344,Calm,In the midst of chaos. there is always an opportunity for serenity.
345,Calm,When you have peace in your heart. you can walk through any storm.
346,Calm,You are allowed to be both a masterpiece and a work in progress. simultaneously.
347,Calm,Peace comes from within; do not seek it without. — Buddha
348,Calm,The soul always knows what to do to heal itself. The challenge is to silence the mind. — Caroline Myss
349,Calm,Embrace the stillness; it's where the magic happens.
350,Calm,Take a breath. it's just a moment.
351,Happy,Happiness is not something ready-made. It comes from your own actions. — Dalai Lama
352,Happy,The purpose of our lives is to be happy. — Dalai Lama
353,Happy,Count your age by friends. not years. Count your life by smiles. not tears. — John Lennon
354,Happy,The most important decision you make is to be in a good mood. — Voltaire
355,Happy,Smile. it is the key that fits the lock of everybody's heart. — Anthony J. D'Angelo
356,Happy,The greatest pleasure in life is doing what people say you cannot do. — Walter Bagehot
357,Happy,Happiness is the art of never holding in your mind the memory of any unpleasant thing. — Anonymous
358,Happy,Happiness is a warm puppy. — Charles M. Schulz
359,Happy,Every day may not be good. but there's something good in every day. — Alice Morse Earle
360,Happy,Success is getting what you want. Happiness is wanting what you get. — Dale Carnegie
361,Happy,The key to happiness is letting each situation be what it is instead of what you think it should be.
362,Happy,The most wasted of days is one without laughter. — E.E. Cummings
363,Happy,Find ecstasy in life; the mere sense of living is joy enough. — Emily Dickinson
364,Happy,Happiness is not a goal; it is a by-product. — Eleanor Roosevelt
365,Happy,Do more of what makes you happy.
366,Happy,You are never fully dressed without a smile. — Martin Charnin
367,Happy,Happiness is a journey. not a destination.
368,Happy,Collect moments. not things.
369,Happy,Life is short. Smile while you still have teeth.
370,Happy,Life is like a camera. Focus on what's important. capture the good times. develop from the negatives.
371,Sad,Tears are words that need to be written. — Paulo Coelho
372,Sad,Sadness is a healer; it prepares you for the good.
373,Sad,Every sunset brings the promise of a new dawn. — Ralph Waldo Emerson
374,Sad,Sadness flies away on the wings of time. — Jean de La Fontaine
375,Sad,Sorrow is one of the vibrations that prove the fact of living. — Antoine de Saint-Exupéry
376,Sad,Pain is inevitable. Suffering is optional. — Haruki Murakami
377,Sad,There is no remedy for love but to love more. — Henry David Thoreau
378,Sad,Sometimes. you just need to take a break and breathe.
379,Sad,It's okay to feel lost sometimes; it's how you find your way.
380,Sad,Don't cry because it's over. smile because it happened. — Dr. Seuss
381,Sad,The wound is the place where the Light enters you. — Rumi
382,Sad,Sadness is but a wall between two gardens. — Kahlil Gibran
383,Sad,There's a crack in everything; that's how the light gets in. — Leonard Cohen
384,Sad,Grief is like a river; it ebbs and flows.
385,Sad,When it rains. look for rainbows. When it's dark. look for stars.
386,Sad,It's okay to not be okay.
387,Sad,The only way to get through it is to get through it.
388,Sad,Healing takes time. and asking for help is a courageous step.
389,Sad,Sadness is an ocean. and sometimes you have to swim through it.
390,Sad,To weep is to make less the depth of grief. — William Shakespeare
391,Stressed,The greatest weapon against stress is our ability to choose one thought over another.
392,Stressed,Stress is not what happens to us. It's our response to what happens. — Maureen Killoran
393,Stressed,Keep calm and carry on.
394,Stressed,Take a deep breath. It's just a bad day. not a bad life.
395,Stressed,You can't stop the waves. but you can learn to surf. — Jon Kabat-Zinn
396,Stressed,Take a break. It's okay to step back.
397,Stressed,Breathe deeply; it's just a moment.
398,Stressed,Worry is like a rocking chair; it gives you something to do but gets you nowhere. — Glenn Turner
399,Stressed,Let go of the stress; it's not worth it.
400,Stressed,Life is too important to be taken seriously. — Oscar Wilde
401,Calm,A calm mind brings inner strength and self-confidence.
402,Calm,The quieter you become. the more you can hear. — Ram Dass
403,Calm,Calmness is the cradle of power.
404,Calm,Peace is not the absence of conflict. but the ability to cope with it. — Mahatma Gandhi
405,Calm,Serenity is not found in a place but in the heart.
406,Calm,The only way to find peace is to create it.
407,Calm,Wherever you go. go with all your heart. — Confucius
408,Calm,Stay calm and enjoy the moment.
409,Calm,Let your mind be still.
410,Calm,Life is like water; it flows. bends. and shapes to fit.
411,Calm,In the midst of movement and chaos. keep stillness inside of you. — Deepak Chopra
412,Calm,Peace of mind is not the absence of conflict but the ability to cope with it.
413,Calm,Calm is a superpower.
414,Calm,Take a deep breath. and let it all go.
415,Calm,Life becomes easier when you learn to relax.
416,Calm,Simplicity brings calmness.
417,Calm,Inhale peace. exhale worry.
418,Calm,Your calm mind is the ultimate weapon against your challenges.
419,Calm,Find your calm and let it guide you.
420,Calm,Calmness is the beauty of the mind.
421,Happy,Happiness is a choice. You can choose to be happy.
422,Happy,Joy is not in things; it is in us. — Richard Wagner
423,Happy,Happiness is a butterfly. which when pursued. is always just beyond your grasp. — Nathaniel Hawthorne
424,Happy,Be happy for this moment. This moment is your life. — Omar Khayyam
425,Happy,The best way to cheer yourself is to try to cheer someone else up. — Mark Twain
426,Happy,Happiness is the secret to all beauty. There is no beauty without happiness. — Christian Dior
427,Happy,Happiness blooms from within.
428,Happy,Your happiness is your own creation.
429,Happy,Let your smile change the world. but don't let the world change your smile.
430,Happy,Happiness is not a destination. it's a way of life.
431,Happy,The only thing that can ruin a happy moment is your mind.
432,Happy,Radiate positivity and happiness.
433,Happy,Happiness is like a kiss. You must share it to enjoy it.
434,Happy,A smile is a curve that sets everything straight.
435,Happy,Happiness is found when you stop comparing yourself to other people.
436,Happy,To be happy. we must not be too concerned with others.
437,Happy,Happiness is the highest good.
438,Happy,Be happy and a reason will come along.
439,Happy,True happiness comes from within.
440,Happy,The most effective way to do it. is to do it. — Amelia Earhart
441,Sad,Sadness is but a shadow; it cannot last.
442,Sad,Even the darkest night will end. and the sun will rise. — Victor Hugo
443,Sad,Sadness is a state of mind that can be changed.
444,Sad,Pain is temporary; quitting lasts forever. — Lance Armstrong
445,Sad,Out of difficulties grow miracles. — Jean de La Bruyère
446,Sad,The sun will rise again. and it will shine brighter.
447,Sad,Sadness is only temporary; it cannot last forever.
448,Sad,This too shall pass.
449,Sad,Every disappointment is a step towards a greater opportunity.
450,Sad,There is a crack in everything; that's how the light gets in. — Leonard Cohen
451,Sad,When you are sorrowful. look again in your heart. and you shall see that in truth you are weeping for that which has been your delight. — Kahlil Gibran
452,Sad,Sometimes you need to take a break from everyone and spend time alone.
453,Sad,There is no greater sorrow than to recall happiness in times of misery. — Dante Alighieri
454,Sad,Every day may not be good. but there is something good in every day.
455,Sad,You cannot stop the waves. but you can learn to surf.
456,Sad,Sometimes the heart needs more time to accept what the mind already knows.
457,Sad,In the middle of difficulty lies opportunity. — Albert Einstein
458,Sad,There is beauty in sadness.
459,Sad,Even in the midst of loss. there is the potential for new beginnings.
460,Sad,To feel sadness is to feel alive.
461,Stressed,Stress is caused by being ‘here' but wanting to be ‘there'.
462,Stressed,The greatest weapon against stress is our ability to choose one thought over another.
463,Stressed,You can't control the wind. but you can adjust your sails.
464,Stressed,Stress is merely the result of being here when you'd rather be there.
465,Stressed,Don't stress the could haves; if it should have. it would have.
466,Stressed,The only way to deal with stress is to take a deep breath and face it.
467,Stressed,When everything feels like an uphill struggle. just think of the view from the top.
468,Stressed,Stress is what you make of it; find a way to turn it into strength.
469,Stressed,If you want to conquer the anxiety of life. live in the moment. live in the breath. — Amit Ray
470,Stressed,Take a deep breath and remember that you are going to be okay.
471,Calm,Calmness is the cradle of power.
472,Calm,A calm mind is a powerful mind.
473,Calm,Peace is not the absence of conflict. but the ability to cope with it.
474,Calm,Calmness is the way to find clarity.
475,Calm,The quieter you become. the more you can hear.
476,Calm,In the midst of chaos. there is always a calm.
477,Calm,You can't always control what goes on outside. but you can control what goes on inside.
478,Calm,Find peace in the chaos of life.
479,Calm,The calm mind is a great source of strength.
480,Calm,The best way to regain your calm is to take a step back and breathe.
481,Calm,Calmness is the key to all life's challenges.
482,Calm,Serenity is the ultimate source of strength.
483,Calm,Breathe deeply; let peace flow through you.
484,Calm,A peaceful heart is a powerful heart.
485,Calm,In quietness. we find the strength to face any storm.
486,Calm,Every moment is a fresh beginning; stay calm.
487,Calm,True power lies in being calm and centered.
488,Calm,Your calm mind is the ultimate weapon against your challenges.
489,Calm,Serenity comes when you let go of the chaos around you.
490,Calm,Calmness is the soul's breath.
491,Happy,The purpose of our lives is to be happy. — Dalai Lama
492,Happy,Happiness is not something ready-made. It comes from your own actions. — Dalai Lama
493,Happy,Happiness is a warm puppy. — Charles M. Schulz
494,Happy,For every minute you are angry. you lose sixty seconds of happiness. — Ralph Waldo Emerson
495,Happy,The happiest people don't have the best of everything; they make the best of everything.
496,Happy,Smile. it's free therapy. — Douglas Horton
497,Happy,Count your age by friends. not years. Count your life by smiles. not tears. — John Lennon
498,Happy,Happiness is when what you think. what you say. and what you do are in harmony. — Mahatma Gandhi
499,Happy,Be happy. it drives people crazy.
500,Happy,Happiness is the art of never holding in your mind the memory of any unpleasant thing.
501,Happy,A happy family is but an earlier heaven. — George Bernard Shaw
502,Happy,You have to have confidence in your ability. and then be tough enough to follow through. — Rosalynn Carter
503,Happy,Happiness is a choice. not a result.
504,Happy,Your smile is your logo. your personality is your business card. and how you leave others feeling after an experience with you becomes your trademark. — Jay Danzie
505,Happy,Happiness can be found even in the darkest of times if one only remembers to turn on the light. — Albus Dumbledore
506,Happy,Life is too short to be serious all the time. So if you can't laugh at yourself. call me... and I'll laugh at you.
507,Happy,Happiness is the highest form of health.
508,Happy,The best things in life are free. They are not things.
509,Happy,Being happy never goes out of style. — Lilly Pulitzer
510,Happy,Life is better when you're laughing.
511,Sad,Sadness can be a beautiful thing.
512,Sad,Tears are words that need to be written. — Paulo Coelho
513,Sad,It's okay to be sad sometimes; it means you care.
514,Sad,In order to be able to give love. you must first have it. In order to share sadness. you must first feel it.
515,Sad,The world is full of sadness. but it's also full of beauty.
516,Sad,Sometimes you need to cry to be strong.
517,Sad,Sadness is just a moment; it is not your whole life.
518,Sad,We must embrace pain and burn it as fuel for our journey. — Kenji Miyazawa
519,Sad,You can't be brave if you've only had wonderful things happen to you. — Mary Tyler Moore
520,Sad,Every experience. good or bad. is a lesson.
521,Sad,Sometimes the best way to get through the sadness is to let it wash over you.
522,Sad,Even in sadness. there's beauty to be found.
523,Sad,Sadness is not a weakness; it shows you care deeply.
524,Sad,Life can be tough. but so are you.
525,Sad,You are not alone in your sadness.
526,Sad,It's okay to feel sad. but remember to look for the light.
527,Sad,Don't be afraid to be sad. It can lead you to happiness.
528,Sad,Sometimes. the most productive thing you can do is rest and let your emotions run.
529,Sad,The sun will shine again. even after the rain.
530,Sad,The only way to get through the pain is to go through it.
531,Stressed,Stress is not what happens to us. It's our response to what happens. — Maureen Killoran
532,Stressed,Don't let your mind bully your body.
533,Stressed,You are braver than you believe. stronger than you seem. and smarter than you think. — A.A. Milne
534,Stressed,Stress is a choice; choose wisely.
535,Stressed,In the middle of difficulty lies opportunity.
536,Stressed,Worrying does not take away tomorrow's troubles; it takes away today's peace.
537,Stressed,The only thing you can control is how you respond to stress.
538,Stressed,A little progress each day adds up to big results.
539,Stressed,You cannot change the direction of the wind. but you can adjust your sails.
540,Stressed,Let go of the stress; it's a heavy burden to carry.
541,Calm,Calm is the new cool.
542,Calm,In the stillness of the mind. you will find your strength.
543,Calm,Calmness is a superpower.
544,Calm,A calm sea does not make a skilled sailor.
545,Calm,Be like water. my friend. — Bruce Lee
546,Calm,Inhale peace. exhale stress.
547,Calm,Calmness is the key to clarity.
548,Calm,Peace begins with a smile. — Mother Teresa
549,Calm,Let your calmness be your strength.
550,Calm,A calm mind brings inner strength and self-confidence.
551,Calm,Be at peace with yourself. and the world will follow.
552,Calm,Calmness is the balance between the mind and the heart.
553,Calm,Stay calm and carry on.
554,Calm,Calmness is the antidote to chaos.
555,Calm,A peaceful mind is a powerful mind.
556,Calm,Stillness speaks; listen to your inner voice.
557,Calm,In the calm. we find our true selves.
558,Calm,Simplicity brings calmness.
559,Calm,Calmness is a choice; choose it wisely.
560,Calm,Embrace the silence; it's where clarity lives.
561,Motivated,Success is not for the lazy.
562,Motivated,Your only limit is you.
563,Motivated,Work hard in silence. let success be your noise.
564,Motivated,Push yourself because no one else is going to do it for you.
565,Motivated,The harder you work for something. the greater you'll feel when you achieve it.
566,Motivated,Dream big. work hard. stay focused.
567,Motivated,Success doesn't just find you; you have to go out and get it.
568,Motivated,The future depends on what you do today. — Mahatma Gandhi
569,Motivated,Don't watch the clock; do what it does. Keep going. — Sam Levenson
570,Motivated,Do something today that your future self will thank you for.
571,Motivated,Believe you can. and you're halfway there. — Theodore Roosevelt
572,Motivated,Your mindset is your most powerful asset.
573,Motivated,Success usually comes to those who are too busy to be looking for it. — Henry David Thoreau
574,Motivated,The only way to do great work is to love what you do. — Steve Jobs
575,Motivated,Success is not how high you have climbed. but how you make a positive difference to the world. — Roy T. Bennett
576,Motivated,It's not about perfect. It's about effort.
577,Motivated,Action is the foundational key to all success. — Pablo Picasso
578,Motivated,Great things never come from comfort zones.
579,Motivated,Hardships often prepare ordinary people for an extraordinary destiny. — C.S. Lewis
580,Motivated,Success is the sum of small efforts repeated day in and day out. — Robert Collier
581,Energized,Energy and persistence conquer all things. — Benjamin Franklin
582,Energized,Your energy introduces you before you even speak.
583,Energized,Let your energy be contagious.
584,Energized,The more you give. the more you receive.
585,Energized,Energy flows where attention goes.
586,Energized,A positive attitude is like a magnet for positive energy.
587,Energized,Keep your face to the sunshine. and you cannot see a shadow. — Helen Keller
588,Energized,You are energy. You are powerful.
589,Energized,Stay positive. work hard. make it happen.
590,Energized,Be a warrior. not a worrier.
591,Happy,The only thing that will make you happy is being happy with who you are. — Goldie Hawn
592,Happy,Happiness blooms from within. — Unknown
593,Happy,Collect moments. not things. — Unknown
594,Happy,Do more of what makes you happy. — Unknown
595,Happy,Let your smile change the world. but don't let the world change your smile. — Unknown
596,Happy,Happiness is not a destination; it's a way of life. — Author Unknown
597,Happy,Choose to be happy. It's a choice worth making. — Unknown
598,Happy,Every day may not be good. but there's something good in every day. — Alice Morse Earle
599,Happy,Happiness is not in the mere possession of money; it lies in the joy of achievement. in the thrill of creative effort. — Franklin D. Roosevelt
600,Happy,Find ecstasy in life; the mere sense of living is joy enough. — Emily Dickinson
601,Sad,Sadness is a reminder that you are alive. — Unknown
602,Sad,The greatest griefs are those we cause ourselves. — Sophocles
603,Sad,The wound is the place where the Light enters you. — Rumi
604,Sad,Sometimes. when you're feeling sad. you need to embrace the sadness to understand it. — Unknown
605,Sad,Sadness is but a shadow; it will pass. — Unknown
606,Sad,Every day can't be sunny. Sometimes you need the rain to appreciate the sunshine. — Unknown
607,Sad,You have to feel the sadness before you can appreciate the happiness. — Unknown
608,Sad,Tears are the silent language of grief. — Voltaire
609,Sad,What brings us to tears will lead us to grace. — Sue Monk Kidd
610,Sad,It's okay to be a glowstick; sometimes. we need to break before we shine. — Unknown
611,Stressed,Stress is like a rocking chair; it gives you something to do but gets you nowhere. — Glenn Turner
612,Stressed,You can't control everything; sometimes. you just need to relax and have faith that things will work out. — Unknown
613,Stressed,Take a deep breath. It's just a bad day. not a bad life. — Unknown
614,Stressed,Stress is not an absence of strength; it's an invitation to grow. — Unknown
615,Stressed,Do not dwell in the past. do not dream of the future. concentrate the mind on the present moment. — Buddha
616,Stressed,A calm mind brings inner strength and self-confidence. — Dalai Lama
617,Stressed,Let the stress pass; it's just a moment in time. — Unknown
618,Stressed,Do not let your difficulties fill you with anxiety; after all. it is only in the darkest nights that stars shine. — Unknown
619,Stressed,Stress is what happens when your mind overrides the body's desire to choke. — Unknown
620,Stressed,Keep your head up. your heart strong. — Ben Howard
621,Calm,Calmness is the cradle of power. — Josiah Gilbert Holland
622,Calm,Peace is not the absence of conflict. but the presence of creative alternatives for responding to conflict. — Dorothy Thompson
623,Calm,Calm is the source of power. — Unknown
624,Calm,Serenity is not found. it's created. — Unknown
625,Calm,Calm your mind. and you will calm your world. — Unknown
626,Calm,Calmness is a superpower in the storm. — Unknown
627,Calm,When you let go of what you are. you become what you might be. — Lao Tzu
628,Calm,Stillness is where creativity and solutions to problems are found. — Unknown
629,Calm,The quieter you become. the more you can hear. — Ram Dass
630,Calm,Embrace the calm; it is where you find clarity. — Unknown
631,Motivated,If you want to achieve greatness. stop asking for permission. — Unknown
632,Motivated,Success is not final; failure is not fatal: It is the courage to continue that counts. — Winston S. Churchill
633,Motivated,Dream big and dare to fail. — Norman Vaughan
634,Motivated,What you get by achieving your goals is not as important as what you become by achieving your goals. — Zig Ziglar
635,Motivated,The way to get started is to quit talking and begin doing. — Walt Disney
636,Motivated,Act as if what you do makes a difference. It does. — William James
637,Motivated,Success is walking from failure to failure with no loss of enthusiasm. — Winston S. Churchill
638,Motivated,The only limit to our realization of tomorrow will be our doubts of today. — Franklin D. Roosevelt
639,Motivated,Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. — Roy T. Bennett
640,Motivated,What lies behind us and what lies before us are tiny matters compared to what lies within us. — Ralph Waldo Emerson
641,Energized,Energy is contagious; either you affect people or you infect people. — T. Harv Eker
642,Energized,You can't use up creativity. The more you use. the more you have. — Maya Angelou
643,Energized,Success is the result of preparation. hard work. and learning from failure. — Colin Powell
644,Energized,Let your enthusiasm be your guide. — Unknown
645,Energized,Find what energizes you and pursue it relentlessly. — Unknown
646,Energized,Passion is energy. Feel the power that comes from focusing on what excites you. — Oprah Winfrey
647,Energized,The greatest weapon against stress is our ability to choose one thought over another. — William James
648,Energized,Your energy introduces you before you even speak. — Unknown
649,Energized,The best way to predict the future is to create it. — Peter Drucker
650,Energized,Surround yourself with positive people and situations. — Unknown
`;

// Parse CSV-like quotes into an array of objects
const quotes = csvQuotes.trim().split('\n').slice(1).map(row => {
    const [id, mood, quote] = row.split(',');
    return {
        id: id.trim(),
        mood: mood.trim().toLowerCase(),
        quote: quote.trim().replace(/^"|"$/g, '')
    };
});

function getRandomQuote(mood) {
    const moodQuotes = quotes.filter(q => q.mood === mood.toLowerCase());
    return moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
}

function updateQuote(mood) {
    const quote = getRandomQuote(mood);
    if (quote) {
        const lastDashIndex = quote.quote.lastIndexOf('—');
        if (lastDashIndex !== -1) {
            const quoteContent = quote.quote.substring(0, lastDashIndex).trim();
            const author = quote.quote.substring(lastDashIndex + 1).trim();
            
            quoteContainer.style.opacity = '0';
            
            setTimeout(() => {
                quoteText.textContent = `"${quoteContent}"`;
                quoteAuthor.textContent = `— ${author}`;
                
                quoteContainer.style.opacity = '1';
            }, 500);
        } else {
            quoteText.textContent = `"${quote.quote}"`;
            quoteAuthor.textContent = '— Unknown';
        }
    } else {
        quoteText.textContent = 'No quote found for this mood. Please try another.';
        quoteAuthor.textContent = '';
    }
}

moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.getAttribute('data-mood').toLowerCase();
        updateQuote(mood);
        
        button.classList.add('clicked');
        setTimeout(() => button.classList.remove('clicked'), 300);
    });
});

// Gender toggle functionality
genderSwitch.addEventListener('change', () => {
    document.body.classList.toggle('female');
    // Save theme preference to localStorage
    if (document.body.classList.contains('female')) {
        localStorage.setItem('theme', 'female');
    } else {
        localStorage.setItem('theme', 'male');
    }
});

// YouTube Player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'disablekb': 1,
            'modestbranding': 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    setupAudioControls();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        showNotification('Audio is now playing');
        updateButtonStates('play');
    } else if (event.data == YT.PlayerState.PAUSED) {
        showNotification('Audio paused');
        updateButtonStates('pause');
    } else if (event.data == YT.PlayerState.ENDED || event.data == YT.PlayerState.CUED) {
        showNotification('Audio stopped');
        updateButtonStates('stop');
    }
}

function onPlayerError(event) {
    showNotification('An error occurred. Please check the URL and try again.', 'error');
    updateButtonStates('stop');
}

function setupAudioControls() {
    playAudio.addEventListener('click', () => {
        const state = player.getPlayerState();
        if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.CUED) {
            player.playVideo();
        } else {
            const videoId = extractVideoID(youtubeUrl.value);
            if (videoId) {
                player.loadVideoById(videoId);
                player.playVideo();
            } else {
                showNotification('Invalid YouTube URL', 'error');
            }
        }
    });

    pauseAudio.addEventListener('click', () => {
        const state = player.getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
            player.pauseVideo();
        } else if (state === YT.PlayerState.PAUSED) {
            player.playVideo();
        }
    });

    stopAudio.addEventListener('click', () => {
        player.stopVideo();
        player.clearVideo();
    });
}

function updateButtonStates(activeButton) {
    playAudio.classList.toggle('active', activeButton === 'play');
    pauseAudio.classList.toggle('active', activeButton === 'pause');
    stopAudio.classList.toggle('active', activeButton === 'stop');
}

function extractVideoID(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }, 100);
}

//Current Year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Initialize with a random mood
const randomMood = moodButtons[Math.floor(Math.random() * moodButtons.length)].getAttribute('data-mood').toLowerCase();
updateQuote(randomMood);

// Initialize YouTube API
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;