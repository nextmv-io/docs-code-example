s = s.Format(
	func(s store.Store) any {
		return map[string]any{
			"x": x.Get(s),
			"y": y.Slice(s),
			"z": z.Map(s),
		}
	},
)
