import { toBase64 } from "./../utils/toBase64";
import { sendsay } from "./../utils/auth";
import  moment  from 'moment';
import 'moment/locale/ru';


export const addFile = files => {
  return { type: "ADD_FILE", files };
};
export const deleteFile = index => {
  return { type: "DELETE_FILE", index };
};

const now = moment().locale('ru');

export const sendLetter = letter => {
  return dispatch => {
    const body = {
      action: "issue.send.test",
      letter: {
        subject: letter.theme,
        "from.name": letter.fromName,
        "from.email": letter.fromEmail,
        "to.name": letter.toName,
        message: { text: letter.message },
        attaches: [],
      },
      sendwhen: now.format('D MMMM'),
      mca: [letter.toEmail],
    };

    const promise = letter.files.length
      ? Promise.all(letter.files.map(file => toBase64(file)))
      : Promise.resolve();

    return promise.then(convertedFiles => {
      if (convertedFiles) {
        body.attaches = body.letter.attaches.map((at, index) => ({
          name: letter.files[index].name,
          content: convertedFiles[index],
          encoding: "base64",
        }));
      }
      return sendsay.request(body).then(responseLetter => {
        console.log(responseLetter);
        return dispatch({
          type: "SET_SENT_LETTERS",
          letter: {
            trackId: responseLetter["track.id"],
            date: body.sendwhen,
            theme: body.letter.subject,
            toEmail: body.mca,
          },
        });
      });
    });
  };
};

export const getLetterInfo = letterId => {
  return dispatch => {
    const body = {
      action: "track.get",
      id: letterId,
      session: "session",
    };

    return sendsay.request(body).then(res => {
      console.log(res);
      return dispatch({
        type: "GET_LETTER_INFO",
        status: res.obj.status,
        id: letterId,
      })
    })
  };
};
