import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)


main =
  Html.beginnerProgram
  { model = model, view = view, update = update }



-- MODEL

type alias Model = String

model : Model
model = ""



-- UPDATE

type Msg = Commit | Push | Unleash

update : Msg -> Model -> Model
update msg model =
  case msg of
    Commit ->
      model ++ "Commit"

    Push ->
      model ++ "Push"

    Unleash ->
      model ++ "Unleash"



-- VIEW

view : Model -> Html Msg
view model =
  div [] [
    div [] [
      button [ onClick Commit ] [ text "What to do?" ],
      button [ onClick Push ] [ text "And now?" ],
      button [ onClick Unleash ] [ text "Then..." ]
    ],
    div [] [ text (model) ]
  ]