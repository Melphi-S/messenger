import { Chat } from "./models/chat.model.ts";
import { User } from "./userAPI/user.model.ts";

export const MOCK_CHATS: Chat[] = [
  {
    id: 1,
    name: "",
    participants: [1, 2],
    image: "",
    messages: [
      {
        id: 1,
        authorId: 2,
        type: "text",
        body:
          "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n" +
          "\n" +
          "Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
        date: new Date(2025, 1, 1, 11, 56),
        seenBy: [1, 2],
      },
      {
        id: 2,
        authorId: 2,
        type: "image",
        body: "/mockPhotos/camera.jpg",
        date: new Date(2025, 1, 1, 11, 57),
        seenBy: [1, 2],
      },
      {
        id: 3,
        authorId: 1,
        type: "text",
        body: "Круто!",
        date: new Date(2025, 1, 1, 12, 0),
        seenBy: [1, 2],
      },
    ],
  },
  {
    id: 2,
    name: "Диалоги о футболе",
    participants: [1, 3],
    image: "/mockAvatars/football.jpg",
    messages: [
      {
        id: 4,
        authorId: 3,
        type: "text",
        body: "Ты видел вчерашний матч? Такой камбэк на последних минутах – это просто невероятно!",
        date: new Date(2025, 1, 1, 14, 15),
        seenBy: [1, 3],
      },
      {
        id: 5,
        authorId: 1,
        type: "text",
        body: "Да, это было нечто! Гол на 90+5 минуте – это высший класс! Судья даже добавил больше времени из-за задержек, и команда этим воспользовалась!",
        date: new Date(2025, 1, 1, 14, 34),
        seenBy: [1, 3],
      },
      {
        id: 6,
        authorId: 3,
        type: "text",
        body: "Именно! Мне особенно понравилась игра полузащиты – они держали темп до самого конца. Без их пасов такого шанса бы не было.",
        date: new Date(2025, 1, 1, 14, 41),
        seenBy: [3],
      },
      {
        id: 7,
        authorId: 3,
        type: "text",
        body: "Кстати, ты видел статистику? По ударам и владению они вообще проигрывали, но смогли вытащить матч за счёт характера! 💪🔥",
        date: new Date(2025, 1, 1, 15, 5),
        seenBy: [3],
      },
    ],
  },
  {
    id: 3,
    name: "",
    participants: [1, 4],
    image: "",
    messages: [
      {
        id: 8,
        authorId: 1,
        type: "text",
        body: "Привет! 😊 У тебя есть планы на выходные? Я думал, может, сходим в кино, а потом погуляем в парке. Что скажешь?",
        date: new Date(2025, 1, 1, 13, 7),
        seenBy: [1, 4],
      },
      {
        id: 9,
        authorId: 4,
        type: "text",
        body: "Привет! Это звучит здорово! 🎬🌿 Какой фильм хочешь посмотреть?",
        date: new Date(2025, 1, 1, 13, 15),
        seenBy: [1, 4],
      },
      {
        id: 10,
        authorId: 1,
        type: "text",
        body: "Есть новый фильм, который все хвалят – говорят, он очень захватывающий! Или можем выбрать что-то полегче, если хочется просто расслабиться.",
        date: new Date(2025, 1, 1, 13, 18),
        seenBy: [1, 4],
      },
      {
        id: 11,
        authorId: 4,
        type: "text",
        body: "Хм, мне нравится идея с захватывающим фильмом! А после можно взять кофе и прогуляться в парке, если погода будет хорошей. 🌤️💕",
        date: new Date(2025, 1, 1, 13, 27),
        seenBy: [1, 4],
      },
      {
        id: 12,
        authorId: 1,
        type: "text",
        body: "Отличный план! Я как раз знаю уютное кафе неподалёку, там делают очень вкусный капучино. ☕",
        date: new Date(2025, 1, 1, 13, 31),
        seenBy: [1, 4],
      },
      {
        id: 13,
        authorId: 4,
        type: "text",
        body: "О, тогда точно надо зайти! Я обожаю капучино. Кстати, а на какое время брать билеты?",
        date: new Date(2025, 1, 1, 13, 40),
        seenBy: [1, 4],
      },
      {
        id: 14,
        authorId: 1,
        type: "text",
        body: "Думаю, на вечерний сеанс, чтобы успеть спокойно погулять днём, а потом в кино. Как тебе?",
        date: new Date(2025, 1, 1, 13, 48),
        seenBy: [1, 4],
      },
      {
        id: 15,
        authorId: 4,
        type: "text",
        body: "Да, идеально! Тогда давай в субботу, мне кажется, погода будет тёплая.",
        date: new Date(2025, 1, 1, 13, 52),
        seenBy: [1, 4],
      },
      {
        id: 16,
        authorId: 1,
        type: "text",
        body: "Отлично, тогда забронирую билеты! А ты не против, если я зайду за тобой перед кино?",
        date: new Date(2025, 1, 1, 15, 0),
        seenBy: [1, 4],
      },
      {
        id: 17,
        authorId: 4,
        type: "text",
        body: "Конечно, буду только рада! 💕 Жду с нетерпением, думаю, получится классный вечер!",
        date: new Date(2025, 1, 1, 15, 3),
        seenBy: [1, 4],
      },
    ],
  },
  {
    id: 4,
    name: "",
    participants: [1, 5],
    image: "",
    messages: [
      {
        id: 18,
        authorId: 5,
        type: "text",
        body: "Лето уже не за горами! Надо решить, куда поедем отдыхать. Какие идеи?",
        date: new Date(2025, 5, 1, 10, 0),
        seenBy: [1, 5],
      },
      {
        id: 19,
        authorId: 1,
        type: "text",
        body: "Да, надо что-то крутое придумать! Я за море, хочу просто лежать на пляже и ничего не делать 😎",
        date: new Date(2025, 5, 1, 10, 15),
        seenBy: [1, 5],
      },
      {
        id: 20,
        authorId: 5,
        type: "text",
        body: "Пляж — это супер! Как тебе вот это место?",
        date: new Date(2025, 5, 1, 10, 25),
        seenBy: [1, 5],
      },
      {
        id: 21,
        authorId: 5,
        type: "image",
        body: "/mockPhotos/beach.avif",
        date: new Date(2025, 5, 1, 10, 26),
        seenBy: [1, 5],
      },
      {
        id: 22,
        authorId: 1,
        type: "text",
        body: "Выглядит потрясающе! Но, может, подумаем о чем-то более активном? Например, поездка в горы?",
        date: new Date(2025, 5, 1, 10, 40),
        seenBy: [1, 5],
      },
      {
        id: 23,
        authorId: 5,
        type: "text",
        body: "Горы — тоже топ. Посмотри на это, поход с палатками, чистый воздух, вообще кайф!",
        date: new Date(2025, 5, 1, 10, 50),
        seenBy: [1, 5],
      },
      {
        id: 24,
        authorId: 5,
        type: "image",
        body: "/mockPhotos/altai.jpg",
        date: new Date(2025, 5, 1, 10, 51),
        seenBy: [1, 5],
      },
      {
        id: 25,
        authorId: 1,
        type: "text",
        body: "Это выглядит круто, но ты же знаешь, как я отношусь к палаткам... 😅",
        date: new Date(2025, 5, 1, 11, 5),
        seenBy: [1, 5],
      },
      {
        id: 26,
        authorId: 5,
        type: "text",
        body: "Да, знаю, ты тот ещё любитель комфорта 😄. Тогда, может, город? Барселона, Рим, Париж?",
        date: new Date(2025, 5, 1, 11, 20),
        seenBy: [1, 5],
      },
      {
        id: 27,
        authorId: 1,
        type: "text",
        body: "Барселона звучит круто, я бы хотел увидеть Саграда Фамилия и прогуляться по Ла Рамбле!",
        date: new Date(2025, 5, 1, 11, 30),
        seenBy: [1, 5],
      },
      {
        id: 28,
        authorId: 5,
        type: "text",
        body: "О, тогда вот это тебе понравится!",
        date: new Date(2025, 5, 1, 11, 40),
        seenBy: [1, 5],
      },
      {
        id: 29,
        authorId: 5,
        type: "image",
        body: "/mockPhotos/barcelona.avif",
        date: new Date(2025, 5, 1, 11, 41),
        seenBy: [1, 5],
      },
      {
        id: 30,
        authorId: 1,
        type: "text",
        body: "Выглядит потрясающе! Значит, у нас три варианта: море, горы или город. Надо решить 😅",
        date: new Date(2025, 5, 1, 12, 0),
        seenBy: [1, 5],
      },
      {
        id: 31,
        authorId: 5,
        type: "text",
        body: "Однозначно! Главное, не откладывать решения, а то потом останутся только дорогие билеты и отели 😅",
        date: new Date(2025, 5, 1, 13, 10),
        seenBy: [1, 5],
      },
      {
        id: 32,
        authorId: 1,
        type: "text",
        body: "Да, и ещё важно посмотреть жильё. Я как раз нашёл классную квартиру в Барселоне!",
        date: new Date(2025, 5, 1, 13, 20),
        seenBy: [1, 5],
      },
      {
        id: 33,
        authorId: 1,
        type: "image",
        body: "/mockPhotos/room.avif",
        date: new Date(2025, 5, 1, 13, 21),
        seenBy: [1, 5],
      },
      {
        id: 34,
        authorId: 5,
        type: "text",
        body: "Отлично, тогда, кажется, мы определились! Осталось решить, когда бронируем билеты?",
        date: new Date(2025, 5, 1, 13, 50),
        seenBy: [1, 5],
      },
      {
        id: 35,
        authorId: 1,
        type: "text",
        body: "Думаю, лучше на этой неделе, чтобы поймать хорошие цены.",
        date: new Date(2025, 5, 1, 14, 0),
        seenBy: [1, 5],
      },
      {
        id: 36,
        authorId: 5,
        type: "text",
        body: "Согласен! Давай завтра созвонимся и всё окончательно оформим?",
        date: new Date(2025, 5, 1, 14, 10),
        seenBy: [1, 5],
      },
      {
        id: 37,
        authorId: 1,
        type: "text",
        body: "Договорились! Барселона ждёт нас! 😎",
        date: new Date(2025, 5, 1, 14, 20),
        seenBy: [1, 5],
      },
    ],
  },
];

export const MOCK_USERS: User[] = [
  {
    id: 1,
    email: "myemail@mail.ru",
    firstName: "Ваня",
    secondName: "Иванов",
    displayName: "Ванёк",
    phone: "89991012233",
    avatar: "/mockAvatars/user.jpg",
    login: "ivanivanov",
  },
  {
    id: 2,
    email: "pete@mail.ru",
    firstName: "Петя",
    secondName: "Петров",
    displayName: "Pete",
    phone: "89991012244",
    avatar: "/mockAvatars/pete.jpg",
  },
  {
    id: 3,
    email: "basov@mail.ru",
    firstName: "Стас",
    secondName: "Басов",
    displayName: "Стас",
    phone: "89991012244",
    avatar: "",
  },
  {
    id: 4,
    email: "masha@mail.ru",
    firstName: "Маша",
    secondName: "Васечкина",
    displayName: "Маруся",
    phone: "89991012255",
    avatar: "/mockAvatars/witch.jpg",
  },
  {
    id: 5,
    email: "grisha@mail.ru",
    firstName: "Гриша",
    secondName: "Григорьев",
    displayName: "Гриня",
    phone: "89991012266",
    avatar: "/mockAvatars/buzz.jpg",
  },
];

export const currentUser = MOCK_USERS[0];
