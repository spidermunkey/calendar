export const HelpMenu = (props) => (
  <div className='help-menu' {...props}>
    <div className="keymap" key="á">
      <span className="key">á</span>
      <span className="cmd">' + a</span>
    </div>
    <div className="keymap" key="é">
      <span className="key">é</span>
      <span className="cmd">' + e</span>
    </div>
    <div className="keymap" key="í">
      <span className="key">í</span>
      <span className="cmd">' + i</span>
    </div>
    <div className="keymap" key="ó">
      <span className="key">ó</span>
      <span className="cmd">' + o</span>
    </div>
    <div className="keymap" key="ú">
      <span className="key">ú</span>
      <span className="cmd">' + u</span>
    </div>
    <div className="keymap" key="ñ">
      <span className="key">ñ</span>
      <span className="cmd">~ + n</span>
    </div>
    <div className="keymap" key="ü">
      <span className="key">ü</span>
      <span className="cmd">" + u</span>
    </div>
    <div className="keymap" key="¡">
      <span className="key">¡</span>
      <span className="cmd">Right Alt + 1</span>
    </div>
    <div className="keymap" key="¿">
      <span className="key">¿</span>
      <span className="cmd">Right Alt + ?</span>
    </div>
</div>
)
